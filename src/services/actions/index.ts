import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
	IGetUserInfoResponse as IGetUserInfoResponse,
	Ingredient,
	IIngredientsResponse,
	LoginRequest,
	ILoginResponse,
	ILogoutResponse,
	IOrderResponse,
	IPasswordResetResponse,
	IRefreshResponse,
	RegisterRequest,
	IRegisterResponse,
	UpdateUserInfoRequest,
	IUpdateUserInfoResponse,
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

export const removeFilling = createAction<string>('REMOVE_FILLING');

export const moveFilling = createAction<{ source: string; dest: string }>(
	'MOVE_FILLING'
);

export const placeOrder = createAsyncThunk<IOrderResponse, string[]>(
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
		return await request<IOrderResponse>('orders', options);
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
