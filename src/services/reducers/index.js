import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT, HIDE_INGREDIENT_DETAILS, LOAD_INGREDIENTS, REMOVE_FILLING, SHOW_INGREDIENT_DETAILS } from '../actions';


export const initialState = {
	ingredients: [],
	burger: {
		bun: undefined,
		filling: []
	},
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

const burgerReducer = (state = { bun: undefined, filling: [] }, action) => {
	switch (action.type) {
		case ADD_INGREDIENT: {
			if (action.ingredient.type === 'bun') {
				return { ...state, bun: action.ingredient };
			} else {
				const newFilling = {
					uid: uuidv4(),
					ingredient: action.ingredient
				};
				return { ...state, filling: [...state.filling, newFilling] }
			}
		}
		case REMOVE_FILLING: {
			return { ...state, filling: state.filling.filter(item => item.uid !== action.uid) }
		}
		default: {
			return state;
		}
	}
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
