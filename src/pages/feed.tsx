import { useCallback } from 'react';
import { useAppSelector } from '../components/hooks';
import { OrderList } from '../components/order-list/order-list';
import { OrderStatistic } from '../components/order-statistic/order-statistic';
import { Feed as FeedType, OrderStatus } from '../types';
import styles from './feed.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export function Feed() {
	const feed = useAppSelector<FeedType>((state) => state.feed);

	const location = useLocation();
	const navigate = useNavigate();

	const done = feed.orders.filter(
		(order) => order.status === OrderStatus.COMPLETED
	);

	const inprogress = feed.orders.filter(
		(order) => order.status === OrderStatus.PENDING
	);

	const handleItemClick = useCallback(
		(orderNumber: number) => {
			navigate(`/feed/${orderNumber}`, { state: { background: location } });
		},
		[navigate]
	);

	return (
		<div className={styles.feedPage}>
			<div className='text text_type_main-large'>Лента заказов</div>
			<div className={styles.content}>
				<OrderList
					orders={feed.orders}
					showStatus={false}
					onItemClick={handleItemClick}
				/>
				<OrderStatistic
					total={feed.total}
					totalToday={feed.totalToday}
					done={done}
					inprogress={inprogress}
				/>
			</div>
		</div>
	);
}
