import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import styles from './burger-constructor.module.css';
import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { DraggingIngredient, FillingItem, Ingredient, User } from '../../types';
import {
	addIngredient,
	placeOrder,
	removeFilling,
} from '../../services/actions';
import { useDrop } from 'react-dnd';
import { FillingBar } from './filling-bar';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import ConstructorElementPlaceholder from './constructor-element-placeholder';

type SelectedState = {
	readonly bun: Ingredient | null;
	readonly filling: ReadonlyArray<FillingItem>;
	readonly ingredients: ReadonlyArray<Ingredient>;
	readonly user: User | null;
};

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();

	const { bun, filling, ingredients, user } = useAppSelector<SelectedState>(
		(store) => {
			return {
				bun: store.burger.bun,
				filling: store.burger.filling,
				ingredients: store.ingredients,
				user: store.user,
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
					dispatch(addIngredient({ ingredient, uid: uuidv4() }));
				}
			},
		},
		[ingredients]
	);

	const onCloseClick = useCallback((uid: string) => {
		dispatch(removeFilling(uid));
	}, []);

	const myBurgerItems = (
		<>
			{filling.length === 0 && (
				<div className={styles.constructorItem}>
					<div className={styles.dragIcon}></div>
					<ConstructorElementPlaceholder text='Выберите начинку' />
				</div>
			)}
			{filling.map((item) => (
				<FillingBar key={item.uid} uid={item.uid}>
					<div data-testid={`filling-${item.uid}`}>
						<ConstructorElement
							isLocked={false}
							text={item.ingredient.name}
							price={item.ingredient.price}
							thumbnail={item.ingredient.image}
							handleClose={() => onCloseClick(item.uid)}
						/>
					</div>
				</FillingBar>
			))}
		</>
	);

	const content = (
		<div>
			<div className={styles.constructorItem + ' pt-25 pb-4'}>
				<div className={styles.dragIcon}></div>
				{bun && (
					<div data-testid='bun-top'>
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				)}
				{!bun && (
					<ConstructorElementPlaceholder type='top' text='Выберите булку' />
				)}
			</div>
			<ul className={styles.myBurger + ' custom-scroll'}>{myBurgerItems}</ul>
			<div className={styles.constructorItem + ' pt-4'}>
				<div className={styles.dragIcon}></div>
				{bun && (
					<div data-testid='bun-bottom'>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				)}
				{!bun && (
					<ConstructorElementPlaceholder text='Выберите булку' type='bottom' />
				)}
			</div>
		</div>
	);

	const navigate = useNavigate();

	const handlePlaceOrder = () => {
		if (user === null) {
			navigate('/login');
		} else if (bun) {
			const ids = [bun, ...filling.map((item) => item.ingredient), bun].map(
				(item) => item._id
			);
			dispatch(placeOrder(ids));
		}
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
		<div ref={drop} className={styles.burgerConstructor}>
			{content}
			<div className={styles.footer}>
				<div className={styles.total}>
					<span className='text text_type_main-large pr-2'>{total}</span>
					<CurrencyIcon type='primary' className={styles.currencyIcon} />
				</div>
				<Button
					data-testid='button-put-order'
					htmlType='button'
					type='primary'
					size='large'
					onClick={handlePlaceOrder}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
