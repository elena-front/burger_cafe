import { Order } from '../../types';
import { OrderListItem } from './order-list-item';
import styles from './order-list.module.css';

type Props = {
	orders: ReadonlyArray<Order>;
	showStatus: boolean;
	onItemClick?: (number: number) => void;
};

export function OrderList({
	orders,
	showStatus,
	onItemClick = () => {},
}: Props) {
	return (
		<div className={styles.listContainer + ' custom-scroll'}>
			<ul className={styles.list}>
				{orders.map((order) => (
					<li key={order.number} onClick={() => onItemClick(order.number)}>
						<OrderListItem order={order} showStatus={showStatus} />
					</li>
				))}
			</ul>
		</div>
	);
}
