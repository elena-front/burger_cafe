export enum IngredientType {
	BUN = 'bun',
	MAIN = 'main',
	SAUCE = 'sauce',
}

export type Ingredient = {
	readonly _id: string;
	readonly name: string;
	readonly type: IngredientType;
	readonly proteins: number;
	readonly fat: number;
	readonly carbohydrates: number;
	readonly calories: number;
	readonly price: number;
	readonly image: string;
	readonly image_mobile: string;
	readonly image_large: string;
	readonly __v: number;
};

export type Order = {
	readonly createdAt: string;
	readonly ingredients: ReadonlyArray<string>;
	readonly name: string;
	readonly number: number;
	readonly status: OrderStatus;
	readonly updatedAt: string;
	readonly _id: string;
};

export type User = {
	readonly email: string;
	readonly name: string;
};

export type FillingItem = {
	readonly uid: string;
	readonly ingredient: Ingredient;
};

export type BurgerState = {
	readonly bun: Ingredient | null;
	readonly filling: ReadonlyArray<FillingItem>;
};

export type DraggingIngredient = {
	readonly id: string;
};

export type DraggingFilling = {
	readonly uid: string;
};

export type Token = {
	readonly accessToken: string;
	readonly refreshToken: string;
};

export interface ITokenResponse {
	readonly accessToken: string;
	readonly refreshToken: string;
}

export interface IUserResponse {
	readonly user: User;
}

export interface IPasswordResetResponse extends IResponse {
	readonly message: string;
}

export interface IRegisterResponse
	extends IResponse,
		ITokenResponse,
		IUserResponse {}

export type RegisterRequest = {
	readonly email: string;
	readonly name: string;
	readonly password: string;
};

export interface ILoginResponse
	extends IResponse,
		ITokenResponse,
		IUserResponse {}

export type LoginRequest = {
	readonly email: string;
	readonly password: string;
};

export interface IRefreshResponse extends IResponse, ITokenResponse {}

export interface ILogoutResponse extends IResponse {
	readonly message: string;
}

export interface IGetUserInfoResponse extends IResponse, IUserResponse {}

export type UpdateUserInfoRequest = {
	readonly name?: string;
	readonly email?: string;
	readonly password?: string;
};

export interface IUpdateUserInfoResponse extends IResponse, IUserResponse {}

export interface IResponse {
	readonly success: boolean;
}

export interface IIngredientsResponse extends IResponse {
	readonly data: ReadonlyArray<Ingredient>;
}

export interface IGetOrdersResponse extends IResponse {
	readonly orders: ReadonlyArray<Order>;
}

export interface IPlaceOrderResponse extends IResponse {
	name: string;
	order: Order;
}

export enum OrderStatus {
	CREATED = 'created',
	PENDING = 'pending',
	COMPLETED = 'done',
	CANCELED = 'canceled',
}

export type Feed = {
	readonly orders: ReadonlyArray<Order>;
	readonly total: number;
	readonly totalToday: number;
};

export type Response = {
	readonly success: boolean;
};
