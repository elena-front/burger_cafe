import { OrderDetails } from '../../types';
import styles from './order-statistic.module.css';

type Props = {
	total: number;
	totalToday: number;
	done: ReadonlyArray<OrderDetails>;
	inprogress: ReadonlyArray<OrderDetails>;
};

export function OrderStatistic({ total, totalToday, done, inprogress }: Props) {
	return (
		<div className={styles.containerStat}>
			<div className={styles.status}>
				<div className={styles.orderStatus}>
					<div className='text text_type_main-medium'>Готовы:</div>
					<div
						className='text text_type_digits-default'
						style={{ color: '#00CCCC' }}>
						{done.map((item, index) => (
							<div key={index}>{item.number.toString().padStart(6, '0')}</div>
						))}
					</div>
				</div>
				<div className={styles.orderStatus}>
					<div className='text text_type_main-medium'>В работе:</div>
					<div className='text text_type_digits-default'>
						{inprogress.map((item, index) => (
							<div key={index}>{item.number.toString().padStart(6, '0')}</div>
						))}
					</div>
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
