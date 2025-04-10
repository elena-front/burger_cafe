export type Ingredient = {
	_id: string;
	name: string;
	type: string;
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

export type Order = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export type User = {
	email: string;
	login: string;
};

export type FillingItem = {
	uid: string;
	ingredient: Ingredient;
};

export type BurgerState = {
	bun: Ingredient | null;
	filling: FillingItem[];
};

export type DraggingIngredient = {
	id: string;
};

export type DraggingFilling = {
	uid: string;
};

export type PasswordResetResult = {
	success: boolean;
	message: string;
};

export type RegisterResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
};

export type RegisterRequest = {
	email: string;
	password: string;
	name: string;
};

export type LoginResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
};

export type LoginRequest = { email: string; password: string };

export type RefreshResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

export type LogoutResponse = {
	success: boolean;
	message: string;
};

export type GetUserInfoResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
};

export type UpdateUserInfoRequest = {
	name?: string;
	email?: string;
	password?: string;
};

export type UpdateUserInfoResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
};
