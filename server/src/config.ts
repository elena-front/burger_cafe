import type { SignOptions } from 'jsonwebtoken';

export type ServerConfig = {
	port: number;
	corsOrigin: string;
	jwtSecret: string;
	accessTokenTtl: SignOptions['expiresIn'];
	resetCode: string;
};

export const loadConfig = (): ServerConfig => {
	const secret = process.env.JWT_SECRET;
	if (process.env.NODE_ENV === 'production' && !secret) {
		throw new Error('JWT_SECRET is required in production');
	}

	const port = Number(process.env.PORT ?? 3000);
	if (!Number.isInteger(port) || port < 0 || port > 65535) {
		throw new Error('PORT must be an integer between 0 and 65535');
	}

	return {
		port,
		corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:8080',
		jwtSecret: secret ?? 'insecure-local-development-secret',
		accessTokenTtl: (process.env.ACCESS_TOKEN_TTL ??
			'15m') as SignOptions['expiresIn'],
		resetCode: process.env.RESET_CODE ?? '000000',
	};
};
