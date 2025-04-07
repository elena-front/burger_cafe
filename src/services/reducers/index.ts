import { combineReducers } from 'redux';
import {
	addIngredient,
	closeOrderDetails,
	getUserInfo,
	loadIngredients,
	login,
	logout,
	moveFilling,
	placeOrder,
	refresh,
	register,
	removeFilling,
	updateUserInfo,
} from '../actions';
import { BurgerState, Ingredient, Order, User } from '../../types';
import { createReducer } from '@reduxjs/toolkit';

const ingredientsReducer = createReducer<Ingredient[]>([], (builder) =>
	builder.addCase(loadIngredients.fulfilled, (_state, action) => action.payload)
);

const burgerReducer = createReducer<BurgerState>(
	{ bun: null, filling: [] },
	(builder) =>
		builder
			.addCase(addIngredient, (state, action) => {
				if (action.payload.ingredient.type === 'bun') {
					return { ...state, bun: action.payload.ingredient };
				} else if (state.bun != null) {
					const newFilling = {
						uid: action.payload.uid,
						ingredient: action.payload.ingredient,
					};
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
			.addCase(placeOrder.fulfilled, () => {
				return { bun: null, filling: [] };
			})
);

const orderReducer = createReducer<Order | null>(null, (builder) =>
	builder
		.addCase(closeOrderDetails, () => null)
		.addCase(placeOrder.fulfilled, (_state, action) => action.payload)
		.addCase(placeOrder.rejected, () => null)
);

const userReducer = createReducer<User | null>(null, (builder) => {
	builder
		.addCase(logout.fulfilled, (state, action) => {
			return action.payload.success ? null : state;
		})
		.addCase(login.fulfilled, (state, action) => {
			return action.payload.success
				? {
						email: action.payload.user.email,
						login: action.payload.user.name,
				  }
				: state;
		})
		.addCase(refresh.fulfilled, (state, action) => {
			if (state != null && action.payload.success) {
				return { ...state, accessToken: action.payload.accessToken };
			}
			return state;
		})
		.addCase(register.fulfilled, (state, action) => {
			return action.payload.success
				? {
						email: action.payload.user.email,
						login: action.payload.user.name,
				  }
				: state;
		})
		.addCase(getUserInfo.fulfilled, (state, action) => {
			return action.payload.success
				? {
						email: action.payload.user.email,
						login: action.payload.user.name,
				  }
				: state;
		})
		.addCase(updateUserInfo.fulfilled, (state, action) => {
			return action.payload.success
				? {
						email: action.payload.user.email,
						login: action.payload.user.name,
				  }
				: state;
		});
});

const loadingReducer = createReducer<boolean>(false, (builder) => {
	builder
		.addCase(placeOrder.pending, () => true)
		.addCase(placeOrder.fulfilled, () => false)
		.addCase(placeOrder.rejected, () => false);
});

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerReducer,
	order: orderReducer,
	loading: loadingReducer,
	user: userReducer,
});
