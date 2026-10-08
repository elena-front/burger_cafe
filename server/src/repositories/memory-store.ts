import { randomUUID } from 'node:crypto';
import { hashSync } from 'bcryptjs';
import { ingredientsSeed } from '../data/ingredients.seed';
import { createOrdersSeed, DEMO_USER_ID } from '../data/orders.seed';
import type { Ingredient, Order, StoredUser } from '../domain/types';

export class MemoryStore {
	readonly ingredients: Ingredient[] = ingredientsSeed.map((ingredient) => ({
		...ingredient,
	}));
	readonly users = new Map<string, StoredUser>();
	readonly orders: Order[] = createOrdersSeed();
	readonly sessions = new Map<string, string>();
	private resetUserId: string | null = null;
	private nextOrderNumber =
		Math.max(...this.orders.map(({ number }) => number)) + 1;
	private readonly listeners = new Set<() => void>();

	constructor() {
		this.saveUser({
			id: DEMO_USER_ID,
			email: 'demo@burger.local',
			name: 'Demo User',
			passwordHash: hashSync('demo12345', 10),
		});
	}

	saveUser(user: StoredUser): void {
		this.users.set(user.id, user);
	}

	createUser(input: Omit<StoredUser, 'id'>): StoredUser {
		const user = { ...input, id: randomUUID() };
		this.saveUser(user);
		return user;
	}

	findUserByEmail(email: string): StoredUser | undefined {
		return [...this.users.values()].find((user) => user.email === email);
	}

	createOrder(
		input: Omit<Order, '_id' | 'number' | 'createdAt' | 'updatedAt'>
	): Order {
		const timestamp = new Date().toISOString();
		const order: Order = {
			...input,
			_id: randomUUID(),
			number: this.nextOrderNumber++,
			createdAt: timestamp,
			updatedAt: timestamp,
		};
		this.orders.push(order);
		this.notify();
		return order;
	}

	setResetUser(userId: string): void {
		this.resetUserId = userId;
	}

	consumeResetUser(): StoredUser | undefined {
		const user = this.resetUserId
			? this.users.get(this.resetUserId)
			: undefined;
		this.resetUserId = null;
		return user;
	}

	revokeUserSessions(userId: string): void {
		for (const [token, sessionUserId] of this.sessions) {
			if (sessionUserId === userId) this.sessions.delete(token);
		}
	}

	onOrdersChanged(listener: () => void): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notify(): void {
		for (const listener of this.listeners) listener();
	}
}
