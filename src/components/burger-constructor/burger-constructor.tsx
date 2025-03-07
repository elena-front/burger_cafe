import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import { useCallback, useMemo } from 'react';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from 'react-redux';
import {
	DraggingIngredient,
	FillingItem,
	Ingredient,
	Order,
} from '../../types';
import {
	addIngredient,
	closeOrderDetails,
	placeOrder,
	removeFilling,
} from '../../services/actions';
import { useDrop } from 'react-dnd';
import { FillingBar } from './filling-bar';
import { AppDispatch, RootState } from '../../services/store';

type SelectedState = {
	bun: Ingredient | null;
	filling: FillingItem[];
	ingredients: Ingredient[];
	order: Order | null;
};

const orderAPI = 'https://norma.nomoreparties.space/api/orders';

export const BurgerConstructor = () => {
	const dispatch = useDispatch<AppDispatch>();

	const { bun, filling, ingredients, order } = useSelector<
		RootState,
		SelectedState
	>((store) => {
		return {
			bun: store.burger.bun,
			filling: store.burger.filling,
			ingredients: store.ingredients,
			order: store.order,
		};
	}, shallowEqual);

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
		[ingredients]
	);

	const onCloseClick = useCallback((uid: string) => {
		dispatch(removeFilling(uid));
	}, []);

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
		if (bun) {
			const ids = [bun, ...filling.map((item) => item.ingredient), bun].map(
				(item) => item._id
			);
			dispatch(placeOrder({ api: orderAPI, ids: ids }));
		}
	};
	const handlePlaceOrderClose = () => {
		dispatch(closeOrderDetails());
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
			{order && (
				<Modal onClose={handlePlaceOrderClose} title=''>
					<OrderDetails orderId={order.order.number} />
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
