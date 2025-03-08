import { RootState } from '../../services/store';
import { useSelector } from 'react-redux';
import { Order } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import OrderDetails from './order-details';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { closeOrderDetails } from '../../services/actions';

const OrderDetailsModal = () => {
	const order = useSelector<RootState, Order | null>(
		(state) => state.order,
		shallowEqual
	);

	const dispatch = useDispatch();

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
