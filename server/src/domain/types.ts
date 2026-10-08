export type IngredientType = 'bun' | 'main' | 'sauce';

export type Ingredient = {
	_id: string;
	name: string;
	type: IngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type PublicUser = { email: string; name: string };

export type StoredUser = PublicUser & {
	id: string;
	passwordHash: string;
};

export type OrderStatus = 'created' | 'pending' | 'done' | 'canceled';

export type Order = {
	_id: string;
	ingredients: string[];
	status: OrderStatus;
	name: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	ownerId: string;
};

export type PublicOrder = Omit<Order, 'ownerId'>;

export type Feed = {
	success: true;
	orders: PublicOrder[];
	total: number;
	totalToday: number;
};
