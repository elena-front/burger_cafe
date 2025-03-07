import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import { useState, useCallback, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import {
	DraggingIngredient,
	FillingItem,
	Ingredient,
	RootState,
} from '../../types';
import { addIngredient, removeFilling } from '../../services/actions';
import { useDrop } from 'react-dnd';
import { FillingBar } from './filling-bar';

type SelectedState = {
	bun: Ingredient | null;
	filling: FillingItem[];
	ingredients: Ingredient[];
};

export const BurgerConstructor = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState(false);

	const { bun, filling, ingredients } = useSelector<RootState, SelectedState>(
		(store) => {
			return {
				bun: store.burger.bun,
				filling: store.burger.filling,
				ingredients: store.ingredients,
			};
		},
		shallowEqual
	);

	const [, drop] = useDrop<DraggingIngredient>(
		{
			accept: 'ingredient',
			collect: (monitor) => ({
				isHover: monitor.isOver(),
			}),
			drop: (item) => {
				const id = item.id;
				const ingredient = ingredients.find((item) => item._id === id);
				if (ingredient) {
					dispatch(addIngredient(ingredient));
				}
			},
		},
		[dispatch, ingredients]
	);

	const onCloseClick = useCallback(
		(uid: string) => {
			dispatch(removeFilling(uid));
		},
		[dispatch]
	);

	const myBurgerItems = filling.map((item) => (
		<FillingBar key={item.uid} item={item} onClose={onCloseClick} />
	));

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

	const handlePlaceOrder = () => {
		setState(true);
	};
	const handlePlaceOrderClose = () => {
		setState(false);
	};

	const total = useMemo(
		() =>
			((bun && bun.price * 2) || 0) +
			filling
				.map((item) => item.ingredient.price)
				.reduce((acc, item) => acc + item, 0),
		[bun, filling]
	);

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
