import { Order } from '../../types';
import { shallowEqual } from 'react-redux';
import Modal from '../modal/modal';
import OrderAccepted from './order-accepted';
import { useCallback } from 'react';
import { closeOrderDetails } from '../../services/actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RotatingLines } from 'react-loader-spinner';

type SelectedState = {
	readonly order: Order | null;
	readonly loading: boolean;
};

const OrderAcceptedModal = () => {
	const { order, loading } = useAppSelector<SelectedState>(
		(state) => ({
			order: state.newOrder,
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
					{order && <OrderAccepted orderId={order.number} />}
					{loading && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: '40px',
							}}>
							<div className='text text_type_main-large'>
								Оформляем заказ...
							</div>
							<RotatingLines visible={true} strokeColor='gray' />
						</div>
					)}
				</Modal>
			)}
		</>
	);
};

export default OrderAcceptedModal;
