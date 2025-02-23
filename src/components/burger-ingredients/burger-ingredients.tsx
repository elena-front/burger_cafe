import React, { useState } from 'react';
import {
	Tab,
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';
import { itemsBread, itemsFilling, itemsSause } from '../../data';
import { Ingredient } from '../../types';
import { myBurger } from '../../data';

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
				<div className='text text_type_digits-default price'>
					<div>{item.price.toString()}</div>
					<CurrencyIcon type='primary' />
				</div>
				<div className='text text_type_main-default'>{item.name}</div>
			</li>
		);
	});
	return <ul className='cardsList pl-4 pt-6 pb-2'>{listItems}</ul>;
}

export const BurgerIngredients = () => {
	const [current, setCurrent] = useState('Булки');

	return (
		<div className='burgerIngredient mt-10'>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>

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
			<div className='mainMenu custom-scroll mt-10'>
				<div className='chapter'>
					<h2 className='text text_type_main-medium'>Булки</h2>
					<List items={itemsBread} selectedItems={myBurger}></List>
				</div>
				<div className='chapter'>
					<h2 className='text text_type_main-medium'>Соусы</h2>
					<List items={itemsSause} selectedItems={myBurger}></List>
				</div>
				<div className='chapter'>
					<h2 className='text text_type_main-medium'>Начинки</h2>
					<List items={itemsFilling} selectedItems={myBurger}></List>
				</div>
			</div>
		</div>
	);
};
