import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Ingredient } from '../../types';

export const loadIngredients = createAsyncThunk<Ingredient[], string>(
	'LOAD_INGREDIENTS',
	async (apiURL) => {
		try {
			const res = await fetch(apiURL);
			if (res.ok) {
				const json = await res.json();
				return json.data;
			} else {
				throw new Error(`Error status ${res.status}`);
			}
		} catch (exception) {
			console.error('error fetching API', exception);
		}
	}
);

export const showIngredientDetails = createAction<Ingredient>(
	'SHOW_INGREDIENT_DETAILS'
);

export const hideIngredientDetails = createAction('HIDE_INGREDIENT_DETAILS');

export const addIngredient = createAction<Ingredient>('ADD_INGREDIENT');

export const removeFilling = createAction<string>('REMOVE_FILLING');

export const moveFilling = createAction<{ source: string; dest: string }>(
	'MOVE_FILLING'
);
