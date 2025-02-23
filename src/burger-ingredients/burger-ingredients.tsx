import React, { useState } from 'react';
import {
	Tab,
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';
import {
	itemsBread,
	itemsFilling,
	itemsSause,
} from './burger-ingredients-data';
import { Ingredient } from '../types';
import { myBurger } from '../burger-constructor/burger-constructor-data';

type ListProps = {
	items: Ingredient[];
	selectedItems: Ingredient[];
};

function List({ items, selectedItems }: ListProps) {
	const listItems = items.map((item, index) => {
		const count = selectedItems.filter(
			(selectedItem) => item.name === selectedItem.name
		).length;

		return (
			<li key={index} className='card'>
				{count > 0 && (
					<Counter count={count} size='default' extraClass='m-1 counter' />
				)}

				<img src={item.img} className='cardImg'></img>
				<p className='text text_type_main-small price'>
					<div>{item.price.toString()}</div>
					<CurrencyIcon type='primary' />
				</p>
				<p className='text text_type_main-small'>{item.name}</p>
			</li>
		);
	});
	return <ul className='cardsList'>{listItems}</ul>;
}

export const BurgerIngredients = () => {
	const [current, setCurrent] = useState('Булки');

	return (
		<div className='burgerIngredient mt-10'>
			<h1 className='text text_type_main-large mt-5'>Соберите бургер</h1>

			<div className='tab'>
				<Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab
					value='Начинки'
					active={current === 'Начинки'}
					onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className='mainMenu custom-scroll'>
				<div className='chapter mt-10'>
					<h2 className='text text_type_main-medium'>Булки</h2>
					<List items={itemsBread} selectedItems={myBurger}></List>
				</div>
				<div className='chapter mt-10'>
					<h2 className='text text_type_main-medium'>Соусы</h2>
					<List items={itemsSause} selectedItems={myBurger}></List>
				</div>
				<div className='chapter mt-10'>
					<h2 className='text text_type_main-medium'>Начинки</h2>
					<List items={itemsFilling} selectedItems={myBurger}></List>
				</div>
			</div>
		</div>
	);
};
