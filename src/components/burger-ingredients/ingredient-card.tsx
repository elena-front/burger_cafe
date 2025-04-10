import { DraggingIngredient, Ingredient, IngredientType } from '../../types';
import styles from './ingredient-card.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../hooks';
import { Link, useLocation } from 'react-router-dom';

type IngredientCardProps = {
	readonly ingredient: Ingredient;
};

const IngredientCard = ({ ingredient }: IngredientCardProps) => {
	const location = useLocation();

	const count = useAppSelector<number>((state) => {
		if (
			ingredient.type === IngredientType.BUN &&
			state.burger.bun != null &&
			state.burger.bun._id === ingredient._id
		) {
			return 2;
		} else if (ingredient.type !== IngredientType.BUN) {
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

	return (
		<Link
			state={{ background: location }}
			to={`/ingredients/${ingredient._id}`}
			ref={drag}
			className={styles.card + ' text_color_primary'}>
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
		</Link>
	);
};

export default IngredientCard;
