import { Order } from '../../types';
import styles from './order-statistic.module.css';

type Props = {
	total: number;
	totalToday: number;
	done: ReadonlyArray<Order>;
	inprogress: ReadonlyArray<Order>;
};

export function OrderStatistic({ total, totalToday, done, inprogress }: Props) {
	return (
		<div className={styles.containerStat}>
			<div className={styles.status}>
				<div className={styles.orderStatus}>
					<div className='text text_type_main-medium'>Готовы:</div>
					<ul className={`${styles.orderList} custom-scroll`}>
						{done.map((item, index) => (
							<li
								key={index}
								className={`text text_type_digits-default ${styles.completed}`}>
								{item.number.toString().padStart(6, '0')}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.orderStatus}>
					<div className='text text_type_main-medium'>В работе:</div>
					<ul className={`${styles.orderList} custom-scroll`}>
						{inprogress.map((item, index) => (
							<li key={index} className='text text_type_digits-default'>
								{item.number.toString().padStart(6, '0')}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className='done'>
				<div className='text text_type_main-medium'>
					Выполнено за все время:
				</div>
				<div className={styles.glow + ' text text_type_digits-large'}>
					{total}
				</div>
			</div>
			<div className='done'>
				<div className='text text_type_main-medium'>Выполнено за сегодня:</div>
				<div className={styles.glow + ' text text_type_digits-large'}>
					{totalToday}
				</div>
			</div>
		</div>
	);
}
