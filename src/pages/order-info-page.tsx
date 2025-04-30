import { useParams } from 'react-router-dom';
import { OrderInfo } from '../components/order-info/order-info';
import { OrderDetails } from '../types';

const defaultOrder: OrderDetails = {
	number: 34535,
	name: 'Deathstar Starship Main бургер',
	ingredients: [
		'643d69a5c3f7b9001cfa0942',
		'643d69a5c3f7b9001cfa0942',
		'643d69a5c3f7b9001cfa0942',
		'643d69a5c3f7b9001cfa093d',
		'643d69a5c3f7b9001cfa0948',
	],
	total: 480,
	timestamp: new Date(2025, 4, 24, 16, 20, 0),
};

export default function OrderInfoPage() {
	const id = useParams();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<OrderInfo order={defaultOrder} />
		</div>
	);
}
