import { useCallback, useEffect } from 'react';
import { OrderList } from '../components/order-list/order-list';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { profileFeedConnect, profileFeedDisconnect } from '../services/actions';

const PROFILE_FEED_URL = 'wss://norma.nomoreparties.space/orders';

export function OrderHistoryPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { orders } = useAppSelector((state) => state.feedProfile);

	const handleItemClick = useCallback((orderNumber: number) => {
		navigate(`/profile/orders/${orderNumber}`, {
			state: { background: location },
		});
	}, []);

	useEffect(() => {
		dispatch(
			profileFeedConnect(
				`${PROFILE_FEED_URL}?token=${localStorage.getItem('accessToken')}`
			)
		);
		return () => {
			dispatch(profileFeedDisconnect());
		};
	}, []);

	return (
		<OrderList
			orders={orders}
			showStatus={true}
			onItemClick={handleItemClick}
		/>
	);
}
