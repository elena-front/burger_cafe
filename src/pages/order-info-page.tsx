import { useParams } from 'react-router-dom';
import { OrderInfo } from '../components/order-info/order-info';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { OrderDetails } from '../types';
import styles from './order-info-page.module.css';
import { useEffect } from 'react';
import { getOrderByNumber } from '../services/actions';
import { RotatingLines } from 'react-loader-spinner';

export default function OrderInfoPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const order = useAppSelector<OrderDetails | null>((state) => {
		let order = state.feed.orders.find((o) => o.number === +id!);
		if (order) {
			return order;
		}

		order = state.feedProfile.orders.find((o) => o.number === +id!);
		if (order) {
			return order;
		}

		return null;
	});

	useEffect(() => {
		if (!order) {
			dispatch(getOrderByNumber(+id!));
		}
	}, []);

	return (
		<div className={styles.content}>
			{!order && <RotatingLines visible={true} strokeColor='gray' />}
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
