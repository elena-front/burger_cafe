import {
	ConstructorElement,
	CurrencyIcon,
	Button,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import { useState, useCallback } from 'react';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { FillingItem, Ingredient } from '../../types';
import { addIngredient, removeFilling } from '../../services/actions';
import { useDrop } from 'react-dnd';

export const BurgerConstructor = () => {
	const { bun, filling, getIngredientById } = useSelector(
		(store) => ({
			bun: (store as any).burger.bun,
			filling: (store as any).burger.filling as FillingItem[],
			getIngredientById: (id: string) =>
				(store as any).ingredients.find((item: Ingredient) => item._id === id),
		}),
		shallowEqual
	);

	const dispatch = useDispatch();

	const [{ isHover }, drop] = useDrop({
		accept: 'ingredient',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
		drop: (item) => {
			const id = (item as any).id;
			const ingredient = getIngredientById(id);
			dispatch(addIngredient(ingredient));
		},
	});

	const onCloseClick = useCallback((uid: string) => {
		dispatch(removeFilling(uid));
	}, []);

	const myBurgerItems = filling.map((item) => {
		return (
			<li key={item.uid} className={styles.constructorItem}>
				<div className={styles.dragIcon}>
					<DragIcon type='primary' />
				</div>
				<ConstructorElement
					isLocked={false}
					text={item.ingredient.name}
					price={item.ingredient.price}
					thumbnail={item.ingredient.image}
					handleClose={() => onCloseClick(item.uid)}
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

	const total =
		((bun && bun.price * 2) || 0) +
		filling
			.map((item) => item.ingredient.price)
			.reduce((acc, item) => acc + item, 0);

	return (
		<>
			{state && (
				<Modal onClose={handlePlaceOrderClose} title=''>
					<OrderDetails orderId='034536' />
				</Modal>
			)}

			<div ref={drop} className={styles.burgerConstructor}>
				{content}
				<div className={styles.footer}>
					<div className={styles.total}>
						<span className='text text_type_main-large pr-2'>{total}</span>
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
function useCallBack(arg0: () => void) {
	throw new Error('Function not implemented.');
}
