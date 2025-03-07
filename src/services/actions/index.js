
export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_FILLING = 'REMOVE_FILLING';


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

export const addIngredient = (ingredient) => {
	return {
		type: ADD_INGREDIENT,
		ingredient
	}
}


export const removeFilling = (uid) => {
	return {
		type: REMOVE_FILLING,
		uid
	}
}