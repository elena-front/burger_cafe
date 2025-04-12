import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type OrderDetailsProps = {
	readonly orderId: number;
};

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
	return (
		<div className={styles.modalOrderModal}>
			<div className='text text_type_digits-large mt-20'>
				{orderId.toString().padStart(6, '0')}
			</div>
			<div className='text text_type_main-default mt-8'>
				идентификатор заказа
			</div>
			<CheckMarkIcon type='primary' className='mt-15' />
			{/*<img className='mt-15'></img>*/}
			<div className='text text_type_main-small mt-15'>
				Ваш заказ начали готовить
			</div>
			<div className='text text_type_main-small text_color_inactive mt-2 mb-15'>
				Дождитесь готовности на орбитальной станции
			</div>
		</div>
	);
};

export default OrderDetails;
