export type Ingredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
};

export type FillingItem = {
	uid: string;
	ingredient: Ingredient;
};

export type BurgerState = {
	bun: Ingredient | null;
	filling: FillingItem[];
};

export type DraggingIngredient = {
	id: string;
};

export type DraggingFilling = {
	uid: string;
};
