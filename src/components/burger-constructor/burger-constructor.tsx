import {
	ConstructorElement,
	CurrencyIcon,
	Button,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../types';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import { useState } from 'react';
import OrderDetails from '../order-details/order-details';

type BurgerConstructorProps = {
	items: Ingredient[];
};

export const BurgerConstructor = ({ items }: BurgerConstructorProps) => {
	const myBurgerItems = items.map((item, index) => {
		const isFirst = index === 0;
		const isLast = index === items.length - 1;
		const isLocked = isFirst || isLast;
		return (
			<li key={index} className={styles.constructorItem}>
				<div className={styles.dragIcon}>
					{!isLocked && <DragIcon type='primary' />}
				</div>
				<ConstructorElement
					type={isFirst ? 'top' : isLast ? 'bottom' : undefined}
					isLocked={isLocked}
					text={item!.name}
					price={item!.price}
					thumbnail={item!.image}
				/>
			</li>
		);
	});

	const [state, setState] = useState(false);

	const handlePlaceOrder = () => {
		setState(true);
	};
	const handlePlaceOrderClose = () => {
		setState(false);
	};

	return (
		<>
			{state && (
				<Modal onClose={handlePlaceOrderClose} title=''>
					<OrderDetails orderId='034536' />
				</Modal>
			)}

			<div className={styles.burgerConstructor}>
				<ul className={styles.myBurger + ' custom-scroll'}>{myBurgerItems}</ul>
				<div className={styles.footer}>
					<div className={styles.total}>
						<span className='text text_type_main-large pr-2'>610</span>
						<CurrencyIcon type='primary' className={styles.currencyIcon} />
					</div>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={handlePlaceOrder}>
						Оформить заказ
					</Button>
				</div>
			</div>
		</>
	);
};
