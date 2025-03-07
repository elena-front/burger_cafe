import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
	addIngredient,
	hideIngredientDetails,
	loadIngredients,
	moveFilling,
	removeFilling,
	showIngredientDetails,
} from '../actions';
import { BurgerState, Ingredient, RootState } from '../../types';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: RootState = {
	ingredients: [],
	burger: {
		bun: null,
		filling: [],
	},
	ingredientDetails: null,
	orderId: null,
};

const ingredientsReducer = createReducer<Ingredient[]>(
	initialState.ingredients,
	(builder) =>
		builder.addCase(loadIngredients, (_state, action) => action.payload)
);

const burgerReducer = createReducer<BurgerState>(
	initialState.burger,
	(builder) =>
		builder
			.addCase(addIngredient, (state, action) => {
				if (action.payload.type === 'bun') {
					return { ...state, bun: action.payload };
				} else {
					const newFilling = { uid: uuidv4(), ingredient: action.payload };
					return { ...state, filling: [...state.filling, newFilling] };
				}
			})
			.addCase(removeFilling, (state, action) => {
				return {
					...state,
					filling: state.filling.filter((item) => item.uid !== action.payload),
				};
			})
			.addCase(moveFilling, (state, action) => {
				const sourceItem = state.filling.find(
					(item) => item.uid === action.payload.source
				)!;
				const filtered = state.filling.filter(
					(item) => item.uid !== action.payload.source
				);
				const destIndex = filtered.findIndex(
					(item) => item.uid === action.payload.dest
				);
				return {
					...state,
					filling: filtered.toSpliced(destIndex, 0, sourceItem),
				};
			})
);

const ingredientDetailsReducer = createReducer<Ingredient | null>(
	initialState.ingredientDetails,
	(builder) =>
		builder
			.addCase(showIngredientDetails, (_state, action) => action.payload)
			.addCase(hideIngredientDetails, () => null)
);

const orderIdReducer = createReducer<string | null>(
	initialState.orderId,
	() => {}
);

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerReducer,
	ingredientDetails: ingredientDetailsReducer,
	orderId: orderIdReducer,
});
