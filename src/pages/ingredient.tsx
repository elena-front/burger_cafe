import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { loadIngredients } from '../services/actions';

export function Ingredient() {
	const { id } = useParams();

	const dispatch = useAppDispatch();

	const ingredient = useAppSelector(
		(store) =>
			store.ingredients.find((ingredient) => ingredient._id === id) || null,
		shallowEqual
	);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	return (
		ingredient && (
			<div className='mt-30'>
				<IngredientDetails ingredient={ingredient} />
			</div>
		)
	);
}
