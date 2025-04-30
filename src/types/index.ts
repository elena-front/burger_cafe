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

export type Order = {
	readonly number: number;
};

export interface IOrderResponse extends IResponse {
	readonly name: string;
	readonly order: Order;
}

export type OrderDetails = {
	readonly name: string;
	readonly number: number;
	readonly ingredients: ReadonlyArray<string>;
	readonly total: number;
	readonly timestamp: Date;
	readonly status?: OrderStatus;
};

export enum OrderStatus {
	CREATED,
	INPROGRESS,
	COMPLETED,
	CANCELED,
}

export type OrderStatisticData = {
	readonly done: ReadonlyArray<number>;
	readonly inprogress: ReadonlyArray<number>;
	readonly total: number;
	readonly doneToday: number;
};

export type Feed = {
	readonly orders: ReadonlyArray<OrderDetails>;
	readonly total: number;
	readonly totalToday: number;
};
