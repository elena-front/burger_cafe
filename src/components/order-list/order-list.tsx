import { Order } from '../../types';
import { OrderListItem } from './order-list-item';
import styles from './order-list.module.css';

type Props = {
	className?: string;
	orders: ReadonlyArray<Order>;
	showStatus: boolean;
	onItemClick?: (number: number) => void;
};

export function OrderList({
	orders,
	showStatus,
	className = '',
	onItemClick = () => {},
}: Props) {
	return (
		<div className={`${className} ${styles.listContainer} custom-scroll`}>
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
