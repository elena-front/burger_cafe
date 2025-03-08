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
	bun: Ingredient | undefined;
	filling: Ingredient[];
};

export const BurgerConstructor = ({
	items,
	bun,
	filling,
}: BurgerConstructorProps) => {
	const myBurgerItems = filling.map((item, index) => {
		return (
			<li key={index} className={styles.constructorItem}>
				<div className={styles.dragIcon}>
					<DragIcon type='primary' />
				</div>
				<ConstructorElement
					isLocked={false}
					text={item!.name}
					price={item!.price}
					thumbnail={item!.image}
				/>
			</li>
		);
	});

	const content = (
		<div>
			{bun && (
				<div className={styles.constructorItem + ' pt-25 pb-4'}>
					<div className={styles.dragIcon}></div>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={bun.name}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}
			<ul className={styles.myBurger + ' custom-scroll'}>{myBurgerItems}</ul>
			{bun && (
				<div className={styles.constructorItem + ' pt-4'}>
					<div className={styles.dragIcon}></div>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={bun.name}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}
		</div>
	);

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
				{content}
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
