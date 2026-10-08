import type {
	Feed,
	Ingredient,
	Order,
	PublicOrder,
	StoredUser,
} from '../domain/types';
import { HttpError } from '../errors';
import type { MemoryStore } from '../repositories/memory-store';

export class OrderService {
	constructor(private readonly store: MemoryStore) {}

	create(user: StoredUser, ingredientIds: string[]): PublicOrder {
		const ingredients = ingredientIds.map((id) =>
			this.store.ingredients.find((ingredient) => ingredient._id === id)
		);
		if (ingredients.some((ingredient) => !ingredient)) {
			throw new HttpError(400, 'Unknown ingredient');
		}
		const resolvedIngredients = ingredients as Ingredient[];
		const first = resolvedIngredients[0]!;
		const last = resolvedIngredients.at(-1)!;
		if (
			first.type !== 'bun' ||
			last.type !== 'bun' ||
			first._id !== last._id ||
			!resolvedIngredients
				.slice(1, -1)
				.some(({ type }) => type === 'main' || type === 'sauce')
		) {
			throw new HttpError(
				400,
				'Burger must start and end with the same bun and contain a filling'
			);
		}

		const filling = resolvedIngredients
			.slice(1, -1)
			.find(({ type }) => type !== 'bun')!;
		return this.toPublic(
			this.store.createOrder({
				ingredients: ingredientIds,
				status: 'pending',
				name: `${first.name} + ${filling.name}`,
				ownerId: user.id,
			})
		);
	}

	findByNumber(number: number): PublicOrder {
		const order = this.store.orders.find(
			(candidate) => candidate.number === number
		);
		if (!order) throw new HttpError(404, 'Order not found');
		return this.toPublic(order);
	}

	feed(ownerId?: string): Feed {
		const allOrders = [...this.store.orders];
		const orders = (
			ownerId
				? allOrders.filter((order) => order.ownerId === ownerId)
				: allOrders
		)
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
			.map((order) => this.toPublic(order));
		const startOfToday = new Date();
		startOfToday.setUTCHours(0, 0, 0, 0);
		return {
			success: true,
			orders,
			total: allOrders.length,
			totalToday: allOrders.filter(
				({ createdAt }) => new Date(createdAt) >= startOfToday
			).length,
		};
	}

	private toPublic({ ownerId: _ownerId, ...order }: Order): PublicOrder {
		return order;
	}
}
