import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, OrderDetails, OrderStatus } from '../../types';
import styles from './order-list-item.module.css';
import { useAppSelector } from '../hooks';
import Info from '../order-info/info';
import { getRelativeDateTime } from '@utils/index';

type Props = {
	order: OrderDetails;
	showStatus: boolean;
};

export function OrderListItem({ order, showStatus }: Props) {
	const orderIngredients = useAppSelector<ReadonlyArray<Ingredient>>((state) =>
		state.ingredients.filter((i) => order.ingredients.includes(i._id))
	);

	return (
		<div className={styles.listItem}>
			<div className={styles.itemProps}>
				<span className='text text_type_digits-default'>
					#{order.number.toString().padStart(6, '0')}
				</span>
				<span className='text text_type_main-default text_color_inactive'>
					{getRelativeDateTime(order.timestamp)}
				</span>
			</div>

			<Info name={order.name} status={showStatus ? order.status : undefined} />

			<div className={styles.total}>
				<div className={styles.ingredientsRow}>
					{orderIngredients.map((ingredient, index) => (
						<div className={styles.iconContainer}>
							<img
								key={index}
								className={styles.ingredient}
								src={ingredient.image}
							/>
						</div>
					))}
				</div>

				<span className={styles.price}>
					<span className='text text_type_digits-default'>{order.total}</span>
					<CurrencyIcon type='primary' className='ml-2' />
				</span>
			</div>
		</div>
	);
}
