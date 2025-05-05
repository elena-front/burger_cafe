import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
	IGetUserInfoResponse as IGetUserInfoResponse,
	Ingredient,
	IIngredientsResponse,
	LoginRequest,
	ILoginResponse,
	ILogoutResponse,
	IPasswordResetResponse,
	IRefreshResponse,
	RegisterRequest,
	IRegisterResponse,
	UpdateUserInfoRequest,
	IUpdateUserInfoResponse,
	Response,
	Feed,
	IPlaceOrderResponse,
	IGetOrdersResponse,
} from '../../types';
import { requestWithRefresh as request } from '../../utils/index';

export const loadIngredients = createAsyncThunk<ReadonlyArray<Ingredient>>(
	'LOAD_INGREDIENTS',
	async () => (await request<IIngredientsResponse>('ingredients')).data
);

export const addIngredient = createAction<{
	ingredient: Ingredient;
	uid: string;
}>('ADD_INGREDIENT');

export const removeFilling = createAction<string, 'REMOVE_FILLING'>(
	'REMOVE_FILLING'
);

export const moveFilling = createAction<{ source: string; dest: string }>(
	'MOVE_FILLING'
);

export const placeOrder = createAsyncThunk<IPlaceOrderResponse, string[]>(
	'PLACE_ORDER',
	async (ids) => {
		const body = JSON.stringify({ ingredients: ids });
		const options = {
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
			method: 'POST',
			body: body,
		};
		return await request<IPlaceOrderResponse>('orders', options);
	}
);

export const getOrderByNumber = createAsyncThunk<IGetOrdersResponse, number>(
	'GET_ORDER_BY_NUMBER',
	async (id) => {
		return await request<IGetOrdersResponse>(`orders/${id}`);
	}
);

export const closeOrderDetails = createAction('CLOSE_ORDER_DETAILS');

export const passwordReset = createAsyncThunk<IPasswordResetResponse, string>(
	'PASSWORD_RESET',
	async (email: string) => {
		const body = JSON.stringify({ email: email });
		const options = {
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			body: body,
		};
		return await request<IPasswordResetResponse>('password-reset', options);
	}
);

export const setNewPassword = createAsyncThunk<
	IPasswordResetResponse,
	{ password: string; token: string }
>('SET_NEW_PASSWORD', async (data) => {
	const body = JSON.stringify(data);
	const options = {
		headers: {
			'content-type': 'application/json',
		},
		method: 'POST',
		body: body,
	};
	return await request<IPasswordResetResponse>('password-reset/reset', options);
});

export const register = createAsyncThunk<IRegisterResponse, RegisterRequest>(
	'REGISTER',
	async (data) => {
		const body = JSON.stringify(data);
		const options = {
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			body: body,
		};
		return await request<IRegisterResponse>('auth/register', options);
	}
);

export const login = createAsyncThunk<ILoginResponse, LoginRequest>(
	'LOGIN',
	async (data) => {
		const body = JSON.stringify(data);
		const options = {
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			body: body,
		};
		return await request<ILoginResponse>('auth/login', options);
	}
);

export const refresh = createAsyncThunk<IRefreshResponse>(
	'REFRESH',
	async () => {
		const body = JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		});
		const options = {
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			body: body,
		};
		return await request<IRefreshResponse>('auth/token', options);
	}
);

export const logout = createAsyncThunk<ILogoutResponse>('LOGOUT', async () => {
	const body = JSON.stringify({ token: localStorage.getItem('refreshToken') });
	const options = {
		headers: {
			'content-type': 'application/json',
		},
		method: 'POST',
		body: body,
	};
	return await request<ILogoutResponse>('auth/logout', options);
});

export const getUserInfo = createAsyncThunk<IGetUserInfoResponse>(
	'GET_USER_INFO',
	async () => {
		let headers: HeadersInit = {
			'content-type': 'application/json',
		};
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken != null) {
			headers = { ...headers, authorization: 'Bearer ' + accessToken };
		}
		const options = {
			headers: headers,
			method: 'GET',
		};
		return await request<IGetUserInfoResponse>('auth/user', options);
	}
);

export const updateUserInfo = createAsyncThunk<
	IUpdateUserInfoResponse,
	UpdateUserInfoRequest
>('UPDATE_USER_INFO', async (data) => {
	const body = JSON.stringify(data);
	const options = {
		headers: {
			'content-type': 'application/json',
			authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		},
		method: 'PATCH',
		body: body,
	};
	return await request<IUpdateUserInfoResponse>('auth/user', options);
});

export const feedConnect = createAction<string, 'feed/connect'>('feed/connect');
export const feedDisconnect = createAction('feed/disconnect');
export const feedError = createAction<string, 'feed/error'>('feed/error');
export const feedMessage = createAction<Feed & Response, 'feed/message'>(
	'feed/message'
);

export const profileFeedConnect = createAction<string, 'porfileFeed/connect'>(
	'porfileFeed/connect'
);
export const profileFeedDisconnect = createAction('profileFeed/disconnect');
export const profileFeedError = createAction<string, 'profileFeed/error'>(
	'profileFeed/error'
);
export const profileFeedMessage = createAction<
	Feed & Response,
	'profileFeed/message'
>('profileFeed/message');

export type AppActions =
	| ReturnType<typeof moveFilling>
	| ReturnType<typeof addIngredient>
	| ReturnType<typeof closeOrderDetails>
	| ReturnType<typeof removeFilling>
	| ReturnType<typeof feedConnect>
	| ReturnType<typeof feedDisconnect>
	| ReturnType<typeof feedError>
	| ReturnType<typeof feedMessage>
	| ReturnType<typeof profileFeedConnect>
	| ReturnType<typeof profileFeedDisconnect>
	| ReturnType<typeof profileFeedError>
	| ReturnType<typeof profileFeedMessage>;
