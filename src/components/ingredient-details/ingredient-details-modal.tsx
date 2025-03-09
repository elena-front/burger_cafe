import { Ingredient } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details';
import { useCallback } from 'react';
import { hideIngredientDetails } from '../../services/actions';
import { useAppDispatch, useAppSelector } from '../hooks';

const IngredientDetailsModal = () => {
	const ingredientDetails = useAppSelector<Ingredient | null>(
		(state) => state.ingredientDetails,
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		dispatch(hideIngredientDetails());
	}, []);

	return (
		<>
			{ingredientDetails != null && (
				<Modal onClose={handleClose} title='Детали ингредиента'>
					<IngredientDetails ingredient={ingredientDetails} />
				</Modal>
			)}
		</>
	);
};

export default IngredientDetailsModal;
