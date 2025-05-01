import { useCallback } from 'react';
import { OrderList } from '../components/order-list/order-list';
import { OrderDetails, OrderStatus } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

const ordersData: ReadonlyArray<OrderDetails> = [
	{
		number: 34535,
		name: 'Deathstar Starship Main бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa0948',
		],
		total: 480,
		timestamp: new Date(2025, 3, 24, 16, 20, 0),
		status: OrderStatus.INPROGRESS,
	},
	{
		number: 34532,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		total: 5698,
		timestamp: new Date(2025, 3, 25, 16, 20, 0),
		status: OrderStatus.COMPLETED,
	},
	{
		number: 34532,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		total: 5698,
		timestamp: new Date(2025, 3, 25, 16, 20, 0),
		status: OrderStatus.CANCELED,
	},
];

export function OrderHistoryPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const handleItemClick = useCallback((orderNumber: number) => {
		navigate(`/profile/orders/${orderNumber}`, {
			state: { background: location },
		});
	}, []);

	return (
		<OrderList
			orders={ordersData}
			showStatus={true}
			onItemClick={handleItemClick}
		/>
	);
}
