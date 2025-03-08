import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
	addIngredient,
	closeOrderDetails,
	hideIngredientDetails,
	loadIngredients,
	moveFilling,
	placeOrder,
	removeFilling,
	showIngredientDetails,
} from '../actions';
import { BurgerState, Ingredient, Order } from '../../types';
import { createReducer } from '@reduxjs/toolkit';

const ingredientsReducer = createReducer<Ingredient[]>([], (builder) =>
	builder.addCase(loadIngredients.fulfilled, (_state, action) => action.payload)
);

const burgerReducer = createReducer<BurgerState>(
	{ bun: null, filling: [] },
	(builder) =>
		builder
			.addCase(addIngredient, (state, action) => {
				if (action.payload.type === 'bun') {
					return { ...state, bun: action.payload };
				} else if (state.bun != null) {
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
	null,
	(builder) =>
		builder
			.addCase(showIngredientDetails, (_state, action) => action.payload)
			.addCase(hideIngredientDetails, () => null)
);

const orderReducer = createReducer<Order | null>(null, (builder) =>
	builder
		.addCase(closeOrderDetails, () => null)
		.addCase(placeOrder.fulfilled, (_state, action) => action.payload)
		.addCase(placeOrder.rejected, () => null)
);

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerReducer,
	ingredientDetails: ingredientDetailsReducer,
	order: orderReducer,
});
