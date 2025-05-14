import styles from './order-accepted.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
	readonly orderId: number;
};

const OrderAccepted = ({ orderId }: Props) => {
	return (
		<div className={styles.modalOrderModal} data-testid='order-accepted'>
			<div
				className='text text_type_digits-large mt-20'
				data-testid='order-number'>
				{orderId.toString().padStart(6, '0')}
			</div>
			<div className='text text_type_main-default mt-8'>
				идентификатор заказа
			</div>
			<CheckMarkIcon type='primary' className='mt-15' />
			<div className='text text_type_main-small mt-15'>
				Ваш заказ начали готовить
			</div>
			<div className='text text_type_main-small text_color_inactive mt-2 mb-15'>
				Дождитесь готовности на орбитальной станции
			</div>
		</div>
	);
};

export default OrderAccepted;
