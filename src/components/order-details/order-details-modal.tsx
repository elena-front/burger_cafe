import { Order } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import OrderDetails from './order-details';
import { useCallback } from 'react';
import { closeOrderDetails } from '../../services/actions';
import { useAppDispatch, useAppSelector } from '../hooks';

const OrderDetailsModal = () => {
	const order = useAppSelector<Order | null>(
		(state) => state.order,
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		dispatch(closeOrderDetails());
	}, []);

	return (
		<>
			{order != null && (
				<Modal onClose={handleClose}>
					<OrderDetails orderId={order.order.number} />
				</Modal>
			)}
		</>
	);
};

export default OrderDetailsModal;
