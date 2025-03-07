import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DraggingIngredient, Ingredient } from '../../types';
import styles from './ingredients-list.module.css';
import { useDrag } from 'react-dnd';

type IngredientsListProps = {
	items: Ingredient[];
	counts: any;
	onItemClick: (item: Ingredient) => void;
};

const IngredientsList = ({
	items,
	counts,
	onItemClick,
}: IngredientsListProps) => {
	const listItems = items.map((item, index) => {
		const count = counts[item._id];
		const [, drag] = useDrag<DraggingIngredient>({
			type: 'ingredient',
			item: { id: item._id },
		});

		return (
			<li
				ref={drag}
				key={index}
				className={styles.card}
				onClick={() => onItemClick(item)}>
				{count && (
					<Counter
						count={count}
						size='default'
						extraClass={styles.counter + ' m-1'}
					/>
				)}

				<img src={item.image} alt={item.name}></img>
				<div className={styles.price + ' text text_type_digits-default'}>
					<div>{item.price.toString()}</div>
					<CurrencyIcon type='primary' />
				</div>
				<div className='text text_type_main-default'>{item.name}</div>
			</li>
		);
	});
	return <ul className={styles.cardsList + ' pl-4 pt-6 pb-2'}>{listItems}</ul>;
};

export default IngredientsList;
