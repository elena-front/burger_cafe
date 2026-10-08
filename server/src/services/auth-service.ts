import { randomBytes } from 'node:crypto';
import { compare, hash } from 'bcryptjs';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import type { ServerConfig } from '../config';
import type { PublicUser, StoredUser } from '../domain/types';
import { HttpError } from '../errors';
import type { MemoryStore } from '../repositories/memory-store';

type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: PublicUser;
};

export class AuthService {
	constructor(
		private readonly store: MemoryStore,
		private readonly config: ServerConfig
	) {}

	async register(
		name: string,
		email: string,
		password: string
	): Promise<AuthResponse> {
		if (this.store.findUserByEmail(email))
			throw new HttpError(409, 'User already exists');
		const user = this.store.createUser({
			name,
			email,
			passwordHash: await hash(password, 10),
		});
		return this.issueTokenPair(user);
	}

	async login(email: string, password: string): Promise<AuthResponse> {
		const user = this.store.findUserByEmail(email);
		if (!user || !(await compare(password, user.passwordHash))) {
			throw new HttpError(401, 'email or password are incorrect');
		}
		return this.issueTokenPair(user);
	}

	refresh(refreshToken: string): Omit<AuthResponse, 'user'> {
		const userId = this.store.sessions.get(refreshToken);
		if (!userId) throw new HttpError(401, 'Invalid refresh token');
		const user = this.store.users.get(userId);
		if (!user) throw new HttpError(401, 'Invalid refresh token');
		this.store.sessions.delete(refreshToken);
		const pair = this.issueTokenPair(user);
		return { accessToken: pair.accessToken, refreshToken: pair.refreshToken };
	}

	logout(refreshToken: string): void {
		this.store.sessions.delete(refreshToken);
	}

	verifyAccessToken(token: string): StoredUser {
		try {
			const payload = jwt.verify(token, this.config.jwtSecret);
			if (typeof payload === 'string' || typeof payload.sub !== 'string') {
				throw new HttpError(401, 'Invalid access token');
			}
			const user = this.store.users.get(payload.sub);
			if (!user) throw new HttpError(401, 'Invalid access token');
			return user;
		} catch (error) {
			if (error instanceof HttpError) throw error;
			if (error instanceof TokenExpiredError)
				throw new HttpError(401, 'jwt expired');
			if (error instanceof JsonWebTokenError)
				throw new HttpError(401, 'Invalid access token');
			throw error;
		}
	}

	async updateUser(
		user: StoredUser,
		input: { name?: string; email?: string; password?: string }
	): Promise<PublicUser> {
		if (input.email && input.email !== user.email) {
			const existing = this.store.findUserByEmail(input.email);
			if (existing) throw new HttpError(409, 'Email already in use');
		}
		if (input.name) user.name = input.name;
		if (input.email) user.email = input.email;
		if (input.password) user.passwordHash = await hash(input.password, 10);
		return this.toPublicUser(user);
	}

	requestPasswordReset(email: string): void {
		const user = this.store.findUserByEmail(email);
		if (user) this.store.setResetUser(user.id);
	}

	async resetPassword(password: string, token: string): Promise<void> {
		if (token !== this.config.resetCode)
			throw new HttpError(400, 'Invalid reset token');
		const user = this.store.consumeResetUser();
		if (!user) throw new HttpError(400, 'Invalid reset token');
		user.passwordHash = await hash(password, 10);
		this.store.revokeUserSessions(user.id);
	}

	toPublicUser(user: StoredUser): PublicUser {
		return { email: user.email, name: user.name };
	}

	private issueTokenPair(user: StoredUser): AuthResponse {
		const accessToken = jwt.sign({}, this.config.jwtSecret, {
			subject: user.id,
			expiresIn: this.config.accessTokenTtl,
		});
		const refreshToken = randomBytes(32).toString('base64url');
		this.store.sessions.set(refreshToken, user.id);
		return {
			accessToken: `Bearer ${accessToken}`,
			refreshToken,
			user: this.toPublicUser(user),
		};
	}
}
