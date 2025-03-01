import { Ingredient } from '../../types';
import './ingredient-details.css';

type NutritionValueProps = { name: string; value: Number };

const NutritionValue = ({ name, value }: NutritionValueProps) => {
	return (
		<div className='detailsColumn'>
			<div className='text text_type_main-default text_color_inactive'>
				{name}
			</div>
			<div className='text text_type_digits-default text_color_inactive'>
				{value.toString()}
			</div>
		</div>
	);
};

type IngredientDetailsProps = { ingredient: Ingredient };

const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
	return (
		<div className='ingredientDetails'>
			<img src={ingredient.image_large} />
			<p className='text text_type_main-medium mt-4'>{ingredient.name}</p>
			<div className='details mt-8'>
				<NutritionValue name='Калории, ккал' value={ingredient.calories} />
				<NutritionValue name='Белки, г' value={ingredient.proteins} />
				<NutritionValue name='Жиры, г' value={ingredient.fat} />
				<NutritionValue name='Углеводы, г' value={ingredient.carbohydrates} />
			</div>
		</div>
	);
};

export default IngredientDetails;
