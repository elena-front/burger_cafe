import { Ingredient } from '../../types';
import styles from './ingredient-details.module.css';
import NutritionValue from './nutrition-value';

export type NutritionValueProps = { name: string; value: Number };

type IngredientDetailsProps = { ingredient: Ingredient };

const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
	return (
		<div className={styles.ingredientDetails}>
			<img src={ingredient.image_large} alt={ingredient.name} />
			<p className='text text_type_main-medium mt-4'>{ingredient.name}</p>
			<div className={styles.details + ' mt-8'}>
				<NutritionValue name='Калории, ккал' value={ingredient.calories} />
				<NutritionValue name='Белки, г' value={ingredient.proteins} />
				<NutritionValue name='Жиры, г' value={ingredient.fat} />
				<NutritionValue name='Углеводы, г' value={ingredient.carbohydrates} />
			</div>
		</div>
	);
};

export default IngredientDetails;
