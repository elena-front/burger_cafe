import { RootState } from '../../services/store';
import { useSelector } from 'react-redux';
import { Ingredient } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { hideIngredientDetails } from '../../services/actions';

const IngredientDetailsModal = () => {
	const ingredientDetails = useSelector<RootState, Ingredient | null>(
		(state) => state.ingredientDetails,
		shallowEqual
	);

	const dispatch = useDispatch();

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
