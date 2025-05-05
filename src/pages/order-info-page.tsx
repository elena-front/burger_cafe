import { useParams } from 'react-router-dom';
import { OrderInfo } from '../components/order-info/order-info';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { Order } from '../types';
import styles from './order-info-page.module.css';
import { useEffect } from 'react';
import { getOrderByNumber } from '../services/actions';
import { RotatingLines } from 'react-loader-spinner';

export default function OrderInfoPage() {
	const number = +useParams().number!;
	const dispatch = useAppDispatch();

	const order = useAppSelector<Order | undefined>((state) => {
		return (
			state.feed.orders.find((o) => o.number === number) ||
			state.feedProfile.orders.find((o) => o.number === number) ||
			state.orders.find((o) => o.number === number)
		);
	});

	useEffect(() => {
		if (!order) {
			dispatch(getOrderByNumber(number));
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
