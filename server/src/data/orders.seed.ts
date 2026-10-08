import type { Order } from '../domain/types';

export const DEMO_USER_ID = 'user-demo';

const bun = '643d69a5c3f7b9001cfa093c';
const fillings = [
	'643d69a5c3f7b9001cfa0941',
	'643d69a5c3f7b9001cfa093e',
	'643d69a5c3f7b9001cfa0942',
	'643d69a5c3f7b9001cfa0943',
];

export const createOrdersSeed = (now = new Date()): Order[] => {
	const today = Date.UTC(
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate()
	);

	return Array.from({ length: 12 }, (_, index) => {
		const elapsedToday = Math.max(now.getTime() - today, 1);
		const createdAt = new Date(
			index < 4
				? today + Math.floor((elapsedToday * (index + 1)) / 5)
				: today - 24 * 60 * 60 * 1000 - index * 60 * 1000
		).toISOString();
		return {
			_id: `seed-order-${index + 1}`,
			ingredients: [bun, fillings[index % fillings.length], bun],
			status: index < 8 ? 'done' : 'pending',
			name: `Демо-бургер №${index + 1}`,
			number: 41000 + index,
			createdAt,
			updatedAt: createdAt,
			ownerId: index < 5 ? DEMO_USER_ID : `guest-${index}`,
		};
	});
};
