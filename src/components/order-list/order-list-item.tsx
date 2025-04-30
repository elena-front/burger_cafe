import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, OrderDetails, OrderStatus } from '../../types';
import styles from './order-list-item.module.css';
import { useAppSelector } from '../hooks';

type Props = {
	order: OrderDetails;
	showStatus: boolean;
};

const getStatusName = (orderStatus: OrderStatus): string => {
	switch (orderStatus) {
		case OrderStatus.CREATED:
			return 'Создан';
		case OrderStatus.CANCELED:
			return 'Отменен';
		case OrderStatus.COMPLETED:
			return 'Выполнен';
		case OrderStatus.INPROGRESS:
			return 'Готовится';
	}
};

const getStatusClassName = (orderStatus: OrderStatus): string => {
	switch (orderStatus) {
		case OrderStatus.CANCELED:
			return styles.canceled;
		case OrderStatus.COMPLETED:
			return styles.completed;
		default:
			return '';
	}
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
					{order.timestamp.getDate() == new Date().getDate()
						? 'Сегодня'
						: order.timestamp.toLocaleDateString()}
					, {order.timestamp.toLocaleTimeString()}
				</span>
			</div>

			<div className={styles.name + 'text text_type_main-medium'}>
				{order.name}
				{showStatus && (
					<div
						className={
							'mt-2 text text_type_main-small ' +
							getStatusClassName(order.status!)
						}>
						{getStatusName(order.status!)}
					</div>
				)}
			</div>

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
