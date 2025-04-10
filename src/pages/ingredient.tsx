import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useAppSelector } from '../components/hooks';
import { shallowEqual } from 'react-redux';

export function Ingredient() {
	const { id } = useParams();

	const ingredient = useAppSelector(
		(store) =>
			store.ingredients.find((ingredient) => ingredient._id === id) || null,
		shallowEqual
	);

	return (
		ingredient && (
			<div className='mt-30'>
				<IngredientDetails ingredient={ingredient} />
			</div>
		)
	);
}
