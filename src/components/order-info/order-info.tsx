import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, OrderDetails } from '../../types';
import { useAppSelector } from '../hooks';
import styles from './order-info.module.css';

type Props = {
	order: OrderDetails;
};

export function OrderInfo({ order }: Props) {
	const ingredients = useAppSelector<ReadonlyArray<Ingredient>>((state) =>
		state.ingredients.filter((ingredient) =>
			order.ingredients.includes(ingredient._id)
		)
	);

	const counts = order.ingredients.reduce(
		(cnt: { [key: string]: number }, cur: string) => (
			(cnt[cur] = cnt[cur] + 1 || 1), cnt
		),
		{}
	);

	return (
		<div className={styles.orderPage}>
			<div
				className='text text_type_digits-default mb-7'
				style={{ alignSelf: 'center' }}>
				#{order.number.toString().padStart(6, '0')}
			</div>

			<div className='text text_type_main-medium'>{order.name}</div>

			<div
				className='text text_type_main-small mb-10'
				style={{ color: '#00CCCC' }}>
				there will be order's status
			</div>

			<div className='text text_type_main-medium mt-2 mb-3'>Состав:</div>

			<div
				className={
					styles.itemsList + ' text text_type_main-small mb-1 custom-scroll'
				}>
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

			<div className={styles.orderInfo + ' mt-6'}>
				<span className='text text_type_main-default text_color_inactive'>
					{order.timestamp.toDateString()}
				</span>
				<span className={styles.price + ' text text_type_digits-default'}>
					{order.total} <CurrencyIcon type='primary' className='ml-2' />
				</span>
			</div>
		</div>
	);
}
