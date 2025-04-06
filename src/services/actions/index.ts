import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
	GetUserInfoResponse as GetUserInfoResponse,
	Ingredient,
	LoginRequest,
	LoginResponse,
	LogoutResponse,
	Order,
	PasswordResetResult,
	RefreshResponse,
	RegisterRequest,
	RegisterResponse,
	UpdateUserInfoRequest,
	UpdateUserInfoResponse,
} from '../../types';
import { requestWithRefresh as request } from '../../utils/index';

const orderAPI = 'orders';
const ingredientsAPI = 'ingredients';

export const loadIngredients = createAsyncThunk<Ingredient[]>(
	'LOAD_INGREDIENTS',
	async () => (await request(ingredientsAPI)).data
);

export const addIngredient = createAction<{
	ingredient: Ingredient;
	uid: string;
}>('ADD_INGREDIENT');

export const removeFilling = createAction<string>('REMOVE_FILLING');

export const moveFilling = createAction<{ source: string; dest: string }>(
	'MOVE_FILLING'
);

export const placeOrder = createAsyncThunk<Order, string[]>(
	'PLACE_ORDER',
	async (ids) => {
		const body = JSON.stringify({ ingredients: ids });
		const options = {
			headers: {
				'content-type': 'application/json',
			},
			method: 'POST',
			body: body,
		};
		return await request(orderAPI, options);
	}
);

export const closeOrderDetails = createAction('CLOSE_ORDER_DETAILS');

export const passwordReset = createAsyncThunk<PasswordResetResult, string>(
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
		return await request('password-reset', options);
	}
);

export const setNewPassword = createAsyncThunk<
	PasswordResetResult,
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
	return await request('password-reset/reset', options);
});

export const register = createAsyncThunk<RegisterResponse, RegisterRequest>(
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
		return await request('auth/register', options);
	}
);

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
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
		return await request('auth/login', options);
	}
);

export const refresh = createAsyncThunk<RefreshResponse>(
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
		return await request('auth/token', options);
	}
);

export const logout = createAsyncThunk<LogoutResponse>('LOGOUT', async () => {
	const body = JSON.stringify({ token: localStorage.getItem('refreshToken') });
	const options = {
		headers: {
			'content-type': 'application/json',
		},
		method: 'POST',
		body: body,
	};
	return await request('auth/logout', options);
});

export const getUserInfo = createAsyncThunk<GetUserInfoResponse>(
	'GET_USER_INFO',
	async () => {
		const options = {
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
			method: 'GET',
		};
		return await request('auth/user', options);
	}
);

export const updateUserInfo = createAsyncThunk<
	UpdateUserInfoResponse,
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
	return await request('auth/user', options);
});
