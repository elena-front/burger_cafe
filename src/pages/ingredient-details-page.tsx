import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useAppSelector } from '../components/hooks';
import { shallowEqual } from 'react-redux';
import styles from './ingredient-details-page.module.css';

export function IngredientDetailsPage() {
	const { id } = useParams();

	const ingredient = useAppSelector(
		(store) =>
			store.ingredients.find((ingredient) => ingredient._id === id) || null,
		shallowEqual
	);

	return (
		ingredient && (
			<div className={styles.content}>
				<div className={`${styles.header} text text_type_main-large`}>
					Детали ингредиента
				</div>
				<IngredientDetails ingredient={ingredient} />
			</div>
		)
	);
}
