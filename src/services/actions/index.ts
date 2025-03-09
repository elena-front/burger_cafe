import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Ingredient, Order } from '../../types';
import { request } from '../../utils/index';

const orderAPI = 'orders';
const ingredientsAPI = 'ingredients';

export const loadIngredients = createAsyncThunk<Ingredient[]>(
	'LOAD_INGREDIENTS',
	async () => (await request(ingredientsAPI)).data
);

export const showIngredientDetails = createAction<Ingredient>(
	'SHOW_INGREDIENT_DETAILS'
);

export const hideIngredientDetails = createAction('HIDE_INGREDIENT_DETAILS');

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
