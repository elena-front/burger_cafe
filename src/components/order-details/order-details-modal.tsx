import { Order } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import OrderDetails from './order-details';
import { useCallback } from 'react';
import { closeOrderDetails } from '../../services/actions';
import { useAppDispatch, useAppSelector } from '../hooks';

type SelectedState = {
	order: Order | null;
	loading: boolean;
};

const OrderDetailsModal = () => {
	const { order, loading } = useAppSelector<SelectedState>(
		(state) => ({
			order: state.order,
			loading: state.loading,
		}),
		shallowEqual
	);

	const dispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		dispatch(closeOrderDetails());
	}, []);

	return (
		<>
			{(order != null || loading) && (
				<Modal onClose={handleClose}>
					{order != null && <OrderDetails orderId={order.order.number} />}
					{loading && <div>LOADING... </div>}
				</Modal>
			)}
		</>
	);
};

export default OrderDetailsModal;
