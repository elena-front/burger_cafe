import { OrderStatus } from '../../types';
import styles from './info.module.css';

type Props = {
	name: string;
	status?: OrderStatus;
};

const getStatusName = (orderStatus: OrderStatus): string => {
	switch (orderStatus) {
		case OrderStatus.CREATED:
			return 'Создан';
		case OrderStatus.CANCELED:
			return 'Отменен';
		case OrderStatus.COMPLETED:
			return 'Выполнен';
		case OrderStatus.PENDING:
			return 'Готовится';
	}
};

const getStatusClassName = (orderStatus: OrderStatus): string => {
	switch (orderStatus) {
		case OrderStatus.CANCELED:
			return styles.canceled;
		case OrderStatus.COMPLETED:
			return styles.completed;
		default:
			return '';
	}
};

export default function Info({ name, status }: Props) {
	return (
		<div>
			<div className='text text_type_main-medium'>{name}</div>
			{status != null && (
				<div
					className={`text text_type_main-small mt-3 ${getStatusClassName(
						status
					)}`}>
					{getStatusName(status)}
				</div>
			)}
		</div>
	);
}
