import { Ingredient } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details';
import { useCallback } from 'react';
import { useAppSelector } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';

const IngredientDetailsModal = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const ingredientDetails = useAppSelector<Ingredient | null>(
		(state) =>
			state.ingredients.find((ingredient) => ingredient._id === id) || null,
		shallowEqual
	);

	const handleClose = useCallback(() => {
		navigate(-1);
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
