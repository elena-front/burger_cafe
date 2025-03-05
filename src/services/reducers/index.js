import { combineReducers } from 'redux';
import { HIDE_INGREDIENT_DETAILS, LOAD_INGREDIENTS, SHOW_INGREDIENT_DETAILS } from '../actions';


export const initialState = {
	ingredients: [],
	burger: [],
	ingredientDetails: null,
	orderId: null,
};

const ingredientsReducer = (state = [], action) => {
	switch (action.type) {
		case LOAD_INGREDIENTS: {
			return action.ingredients;
		}
		default: {
			return state;
		}
	}
};

const burgerReducer = (state = [], action) => {
	return state
}

const ingredientDetailsReducer = (state = null, action) => {
	switch (action.type) {
		case SHOW_INGREDIENT_DETAILS: {
			return action.ingredient
		}
		case HIDE_INGREDIENT_DETAILS: {
			return null
		}
		default: {
			return state
		}
	}
}

const orderIdReducer = (state = null, action) => {
	return state
}

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerReducer,
	ingredientDetails: ingredientDetailsReducer,
	orderId: orderIdReducer
});
