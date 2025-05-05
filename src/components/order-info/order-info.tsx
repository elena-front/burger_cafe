import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, Order } from '../../types';
import { useAppSelector } from '../hooks';
import styles from './order-info.module.css';
import Info from './info';
import { getRelativeDateTime } from '@utils/index';

type Props = {
	order: Order;
};

type State = {
	readonly ingredients: ReadonlyArray<Ingredient>;
	readonly total: number;
};

export function OrderInfo({ order }: Props) {
	const { ingredients, total } = useAppSelector<State>((state) => ({
		ingredients: state.ingredients.filter((i) =>
			order.ingredients.includes(i._id)
		),
		total: order.ingredients
			.map((id) => state.ingredients.find((i) => i._id === id)?.price || 0)
			.reduce((a, b) => a + b),
	}));

	const counts = order.ingredients.reduce(
		(cnt: { [key: string]: number }, cur: string) => (
			(cnt[cur] = cnt[cur] + 1 || 1), cnt
		),
		{}
	);

	return (
		<div>
			<Info name={order.name} status={order.status} />
			<div className='text text_type_main-medium mt-15'>Состав:</div>
			<div
				className={`${styles.ingredientListContainer} text text_type_main-small mt-6 custom-scroll`}>
				<ul className={styles.ingredientList}>
					{ingredients.map((ingredient, index) => (
						<li key={index} className={styles.ingredientRow}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.iconContainer + ' mr-4'}>
									<img src={ingredient.image} className={styles.ingredient} />
								</div>
								{ingredient.name}
							</div>

							<span className={styles.price + ' text text_type_digits-default'}>
								{counts[ingredient._id].toString()} x {ingredient.price}
								<CurrencyIcon type='primary' className='ml-2' />
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className={`${styles.timePrice} mt-10`}>
				<span className='text text_type_main-default text_color_inactive'>
					{getRelativeDateTime(new Date(order.updatedAt))}
				</span>
				<span className={`${styles.price} text text_type_digits-default`}>
					{total} <CurrencyIcon type='primary' className='ml-2' />
				</span>
			</div>
		</div>
	);
}
