import { useParams } from 'react-router-dom';
import { OrderInfo } from '../components/order-info/order-info';
import { useAppSelector } from '../components/hooks';
import { OrderDetails } from '../types';
import styles from './order-info-page.module.css';

export default function OrderInfoPage() {
	const { id } = useParams();

	const order = useAppSelector<OrderDetails | null>(
		(state) =>
			state.feed.orders.find((order) => order.number.toString() == id) || null
	);

	return (
		<div className={styles.content}>
			{order && (
				<>
					<span className='text text_type_digits-default'>
						#{order.number.toString().padStart(6, '0')}
					</span>
					<OrderInfo order={order} />
				</>
			)}
		</div>
	);
}
