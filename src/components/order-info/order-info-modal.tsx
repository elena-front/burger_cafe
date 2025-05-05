import { useNavigate, useParams } from 'react-router-dom';
import { Order } from '../../types';
import { useAppSelector } from '../hooks';
import { OrderInfo } from './order-info';
import { shallowEqual } from 'react-redux';
import { useCallback } from 'react';
import Modal from '../modal/modal';

export default function OrderInfoModal() {
	const number = +useParams().number!;
	const navigate = useNavigate();
	const orderInfo = useAppSelector<Order | undefined>(
		(state) =>
			state.feed.orders.find((order) => order.number === number) ||
			state.feedProfile.orders.find((order) => order.number === number) ||
			state.orders.find((order) => order.number === number),
		shallowEqual
	);

	const handleClose = useCallback(() => {
		navigate(-1);
	}, []);

	return (
		<>
			{orderInfo != null && (
				<Modal
					onClose={handleClose}
					title={
						<span className='text text_type_digits-default'>
							#{orderInfo.number.toString().padStart(6, '0')}
						</span>
					}>
					<OrderInfo order={orderInfo} />
				</Modal>
			)}
		</>
	);
}
