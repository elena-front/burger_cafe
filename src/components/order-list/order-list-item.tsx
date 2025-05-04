import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, Order, OrderStatus } from '../../types';
import styles from './order-list-item.module.css';
import { useAppSelector } from '../hooks';
import Info from '../order-info/info';
import { getRelativeDateTime } from '@utils/index';

type Props = {
	order: Order;
	showStatus: boolean;
};

type State = {
	ingredients: ReadonlyArray<Ingredient>;
	total: number;
};

const MAX_ITEMS_IN_ROW = 5;

export function OrderListItem({ order, showStatus }: Props) {
	const { ingredients, total } = useAppSelector<State>((state) => ({
		ingredients: state.ingredients.filter((i) =>
			order.ingredients.includes(i._id)
		),
		total: order.ingredients
			.map((id) => state.ingredients.find((i) => i._id === id)?.price || 0)
			.reduce((a, b) => a + b),
	}));

	const hasMore = ingredients.length > MAX_ITEMS_IN_ROW;

	return (
		<div className={styles.listItem}>
			<div className={styles.itemProps}>
				<span className='text text_type_digits-default'>
					#{order.number.toString().padStart(6, '0')}
				</span>
				<span className='text text_type_main-default text_color_inactive'>
					{getRelativeDateTime(new Date(order.updatedAt))}
				</span>
			</div>

			<Info name={order.name} status={showStatus ? order.status : undefined} />

			<div className={styles.total}>
				<div className={styles.ingredientsContainer}>
					{ingredients
						.slice(0, MAX_ITEMS_IN_ROW + 1)
						.toReversed()
						.map((ingredient, index) => (
							<div key={index} className={styles.ingredient}>
								<div className={styles.iconContainer}>
									<img
										key={index}
										className={`${styles.icon} ${
											hasMore && index === 0 ? styles.iconMore : ''
										}`}
										src={ingredient.image}
									/>
								</div>
								{hasMore && index === 0 && (
									<div
										className={`${styles.counter} text text_type_main-default`}>
										+{ingredients.length - MAX_ITEMS_IN_ROW}
									</div>
								)}
							</div>
						))}
				</div>

				<span className={styles.price}>
					<span className='text text_type_digits-default'>{total}</span>
					<CurrencyIcon type='primary' className='ml-2' />
				</span>
			</div>
		</div>
	);
}
