
export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';
export const ADD_BUN = 'ADD_BUN';
export const ADD_MEAT = 'ADD_MEAT';
export const REMOVE_MEAT = 'REMOVE_MEAT';

export const loadIngredients = (ingredients) => {
	return {
		type: LOAD_INGREDIENTS,
		ingredients
	}
}

export const showIngredientDetails = (ingredient) => {
	return {
		type: SHOW_INGREDIENT_DETAILS,
		ingredient
	}
}

export const hideIngredientDetails = () => {
	return {
		type: HIDE_INGREDIENT_DETAILS
	}
}
