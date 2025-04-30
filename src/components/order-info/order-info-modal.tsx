import { useNavigate, useParams } from 'react-router-dom';
import { OrderDetails } from '../../types';
import { useAppSelector } from '../hooks';
import { OrderInfo } from './order-info';
import { shallowEqual } from 'react-redux';
import { useCallback } from 'react';
import Modal from '../modal/modal';

export default function OrderInfoModal() {
	const { id } = useParams();
	const navigate = useNavigate();
	const orderInfo = useAppSelector<OrderDetails | null>(
		(state) =>
			state.feed.orders.find((order) => order.number.toString() === id) || null,
		shallowEqual
	);

	const handleClose = useCallback(() => {
		navigate(-1);
	}, []);

	return (
		<>
			{orderInfo != null && (
				<Modal onClose={handleClose}>
					<OrderInfo order={orderInfo} />
				</Modal>
			)}
		</>
	);
}
