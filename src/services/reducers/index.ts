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
import {
	BurgerState,
	Ingredient,
	IngredientType,
	Order,
	User,
} from '../../types';
import { createReducer } from '@reduxjs/toolkit';

const ingredientsReducer = createReducer<ReadonlyArray<Ingredient>>(
	[],
	(builder) =>
		builder.addCase(
			loadIngredients.fulfilled,
			(_state, action) => action.payload
		)
);

const burgerReducer = createReducer<BurgerState>(
	{ bun: null, filling: [] },
	(builder) =>
		builder
			.addCase(addIngredient, (state, action) => {
				if (action.payload.ingredient.type === IngredientType.BUN) {
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
		.addCase(placeOrder.fulfilled, (_state, action) => action.payload.order)
		.addCase(placeOrder.rejected, () => null)
);

const userReducer = createReducer<User | null>(null, (builder) => {
	builder
		.addCase(logout.fulfilled, () => null)
		.addCase(login.fulfilled, (_state, action) => ({
			email: action.payload.user.email,
			name: action.payload.user.name,
		}))
		.addCase(refresh.fulfilled, (state, action) => {
			if (state != null) {
				return { ...state, accessToken: action.payload.accessToken };
			}
			return state;
		})
		.addCase(register.fulfilled, (_state, action) => ({
			email: action.payload.user.email,
			name: action.payload.user.name,
		}))
		.addCase(getUserInfo.fulfilled, (_state, action) => ({
			email: action.payload.user.email,
			name: action.payload.user.name,
		}))
		.addCase(updateUserInfo.fulfilled, (_state, action) => ({
			email: action.payload.user.email,
			name: action.payload.user.name,
		}));
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
