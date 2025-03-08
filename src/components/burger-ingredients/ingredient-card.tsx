import { useCallback } from 'react';
import { DraggingIngredient, Ingredient } from '../../types';
import styles from './ingredient-card.module.css';
import { showIngredientDetails } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { RootState } from '../../services/store';

type IngredientCardProps = {
	ingredient: Ingredient;
};

const IngredientCard = ({ ingredient }: IngredientCardProps) => {
	const dispatch = useDispatch();

	const count = useSelector<RootState, number>((state) => {
		if (
			ingredient.type === 'bun' &&
			state.burger.bun != null &&
			state.burger.bun._id === ingredient._id
		) {
			return 2;
		} else if (ingredient.type !== 'bun') {
			return state.burger.filling.filter(
				(item) => item.ingredient._id === ingredient._id
			).length;
		} else {
			return 0;
		}
	});

	const [, drag] = useDrag<DraggingIngredient>({
		type: 'ingredient',
		item: { id: ingredient._id },
	});

	const handleItemClick = useCallback(() => {
		dispatch(showIngredientDetails(ingredient));
	}, []);

	return (
		<li ref={drag} className={styles.card} onClick={handleItemClick}>
			{count > 0 && (
				<Counter
					count={count}
					size='default'
					extraClass={styles.counter + ' m-1'}
				/>
			)}

			<img src={ingredient.image} alt={ingredient.name}></img>
			<div className={styles.price + ' text text_type_digits-default'}>
				<div>{ingredient.price.toString()}</div>
				<CurrencyIcon type='primary' />
			</div>
			<div className='text text_type_main-default'>{ingredient.name}</div>
		</li>
	);
};

export default IngredientCard;
