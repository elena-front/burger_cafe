import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types';
import styles from './ingredients-list.module.css';

type IngredientsListProps = {
	items: Ingredient[];
	selectedIds: string[];
	onItemClick: (item: Ingredient) => void;
};

const IngredientsList = ({
	items,
	selectedIds,
	onItemClick,
}: IngredientsListProps) => {
	const listItems = items.map((item, index) => {
		const count = selectedIds.filter(
			(selectedId) => item._id === selectedId
		).length;

		return (
			<li key={index} className={styles.card} onClick={() => onItemClick(item)}>
				{count > 0 && (
					<Counter count={count} size='default' extraClass='m-1 counter' />
				)}

				<img src={item.image} alt={item.name}></img>
				<div className='text text_type_digits-default price'>
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
