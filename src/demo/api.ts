import { ingredientsSeed } from '../../server/src/data/ingredients.seed';
import {
	createOrdersSeed,
	DEMO_USER_ID,
} from '../../server/src/data/orders.seed';
import { Feed, Ingredient, Order, OrderStatus, User } from '../types';

type DemoUser = { id: string; email: string; name: string; password: string };
type DemoOrder = Order & { ownerId: string };
type DemoState = {
	users: DemoUser[];
	orders: DemoOrder[];
	nextOrderNumber: number;
	resetUserId?: string;
};

const STORAGE_KEY = 'burger-cafe-demo-v1';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const CHANGE_EVENT = 'burger-cafe-demo-changed';
const ingredients = ingredientsSeed as unknown as Ingredient[];

function initialState(): DemoState {
	const orders = createOrdersSeed() as unknown as DemoOrder[];
	return {
		users: [
			{
				id: DEMO_USER_ID,
				email: 'demo@burger.local',
				name: 'Demo User',
				password: 'demo12345',
			},
		],
		orders,
		nextOrderNumber: 41012,
	};
}

function readState(): DemoState {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) return JSON.parse(stored) as DemoState;
	} catch {
		// An invalid local demo snapshot starts a fresh demo session.
	}
	const state = initialState();
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	return state;
}

function saveState(state: DemoState): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	window.dispatchEvent(new Event(CHANGE_EVENT));
}

function fail(message: string): never {
	throw new Error(message);
}

function publicUser(user: DemoUser): User {
	return { name: user.name, email: user.email };
}

function currentUser(state: DemoState, authorization?: string): DemoUser {
	const token =
		authorization?.replace(/^Bearer /, '') ??
		localStorage.getItem(ACCESS_TOKEN_KEY);
	const id = token?.startsWith('demo-access:')
		? token.slice('demo-access:'.length)
		: null;
	return (
		state.users.find((user) => user.id === id) ??
		fail('You should be authorised')
	);
}

function session(user: DemoUser) {
	return {
		success: true,
		accessToken: `Bearer demo-access:${user.id}`,
		refreshToken: `demo-refresh:${user.id}`,
		user: publicUser(user),
	};
}

function publicOrder({ ownerId: _ownerId, ...order }: DemoOrder): Order {
	return order;
}

export function demoFeed(ownerId?: string): Feed & { success: true } {
	const allOrders = readState().orders;
	const orders = allOrders
		.filter((order) => !ownerId || order.ownerId === ownerId)
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.map(publicOrder);
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	return {
		success: true,
		orders,
		total: allOrders.length,
		totalToday: allOrders.filter((order) => new Date(order.createdAt) >= today)
			.length,
	};
}

export function demoProfileId(): string | undefined {
	try {
		return currentUser(readState()).id;
	} catch {
		return undefined;
	}
}

export function subscribeDemoFeed(listener: () => void): () => void {
	window.addEventListener(CHANGE_EVENT, listener);
	window.addEventListener('storage', listener);
	return () => {
		window.removeEventListener(CHANGE_EVENT, listener);
		window.removeEventListener('storage', listener);
	};
}

export async function demoRequest<T>(
	path: string,
	options: RequestInit = {}
): Promise<T> {
	const state = readState();
	const method = options.method?.toUpperCase() ?? 'GET';
	const body = options.body ? JSON.parse(String(options.body)) : {};
	const headers = new Headers(options.headers);
	let result: unknown;

	if (path === 'ingredients' && method === 'GET') {
		result = { success: true, data: ingredients };
	} else if (path === 'auth/login' && method === 'POST') {
		const user = state.users.find(
			(candidate) =>
				candidate.email.toLowerCase() ===
					String(body.email ?? '')
						.trim()
						.toLowerCase() && candidate.password === body.password
		);
		result = session(user ?? fail('Неверный email или пароль'));
	} else if (path === 'auth/register' && method === 'POST') {
		const email = String(body.email ?? '')
			.trim()
			.toLowerCase();
		if (
			!email.includes('@') ||
			String(body.password ?? '').length < 8 ||
			!String(body.name ?? '').trim()
		) {
			fail('Проверьте данные регистрации');
		}
		if (state.users.some((user) => user.email === email))
			fail('Пользователь уже существует');
		const user: DemoUser = {
			id: crypto.randomUUID(),
			name: String(body.name).trim(),
			email,
			password: body.password,
		};
		state.users.push(user);
		saveState(state);
		result = session(user);
	} else if (path === 'auth/user' && method === 'GET') {
		result = {
			success: true,
			user: publicUser(
				currentUser(state, headers.get('authorization') ?? undefined)
			),
		};
	} else if (path === 'auth/user' && method === 'PATCH') {
		const user = currentUser(state, headers.get('authorization') ?? undefined);
		if (body.name) user.name = String(body.name).trim();
		if (body.email) user.email = String(body.email).trim().toLowerCase();
		if (body.password) user.password = String(body.password);
		saveState(state);
		result = { success: true, user: publicUser(user) };
	} else if (path === 'auth/token' && method === 'POST') {
		const id = String(body.token ?? '').replace(/^demo-refresh:/, '');
		const user = state.users.find((candidate) => candidate.id === id);
		if (!user || body.token !== `demo-refresh:${id}`)
			fail('Invalid refresh token');
		const { accessToken, refreshToken } = session(user);
		result = { success: true, accessToken, refreshToken };
	} else if (path === 'auth/logout' && method === 'POST') {
		result = { success: true, message: 'Successful logout' };
	} else if (path === 'password-reset' && method === 'POST') {
		state.resetUserId = state.users.find(
			(user) =>
				user.email ===
				String(body.email ?? '')
					.trim()
					.toLowerCase()
		)?.id;
		saveState(state);
		result = { success: true, message: 'Password reset requested' };
	} else if (path === 'password-reset/reset' && method === 'POST') {
		if (body.token !== '000000') fail('Проверьте код');
		const user = state.users.find(
			(candidate) => candidate.id === state.resetUserId
		);
		if (!user) fail('Пользователь не найден');
		user.password = String(body.password);
		delete state.resetUserId;
		saveState(state);
		result = { success: true, message: 'Password updated' };
	} else if (path === 'orders' && method === 'POST') {
		const user = currentUser(state, headers.get('authorization') ?? undefined);
		const ids = body.ingredients as string[];
		if (!Array.isArray(ids) || ids.length < 3) fail('Добавьте булку и начинку');
		const first = ingredients.find((ingredient) => ingredient._id === ids[0]);
		const last = ingredients.find(
			(ingredient) => ingredient._id === ids.at(-1)
		);
		const filling = ingredients.find(
			(ingredient) =>
				ids.slice(1, -1).includes(ingredient._id) && ingredient.type !== 'bun'
		);
		if (!first || first.type !== 'bun' || last?._id !== first._id || !filling)
			fail('Добавьте булку и начинку');
		const timestamp = new Date().toISOString();
		const order: DemoOrder = {
			_id: crypto.randomUUID(),
			ingredients: ids,
			name: `${first.name} + ${filling.name}`,
			number: state.nextOrderNumber++,
			status: OrderStatus.PENDING,
			createdAt: timestamp,
			updatedAt: timestamp,
			ownerId: user.id,
		};
		state.orders.push(order);
		saveState(state);
		result = { success: true, name: order.name, order: publicOrder(order) };
	} else if (/^orders\/\d+$/.test(path) && method === 'GET') {
		const order = state.orders.find(
			(candidate) => candidate.number === Number(path.slice('orders/'.length))
		);
		if (!order) fail('Заказ не найден');
		result = { success: true, orders: [publicOrder(order)] };
	} else {
		fail('Неизвестный запрос демо-режима');
	}

	return result as T;
}
