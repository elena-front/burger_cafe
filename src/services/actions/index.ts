import { createAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types';

export const loadIngredients = createAction<Ingredient[]>('LOAD_INGREDIENTS');

export const showIngredientDetails = createAction<Ingredient>(
	'SHOW_INGREDIENT_DETAILS'
);

export const hideIngredientDetails = createAction('HIDE_INGREDIENT_DETAILS');

export const addIngredient = createAction<Ingredient>('ADD_INGREDIENT');

export const removeFilling = createAction<string>('REMOVE_FILLING');

export const moveFilling = createAction<{ source: string; dest: string }>(
	'MOVE_FILLING'
);
