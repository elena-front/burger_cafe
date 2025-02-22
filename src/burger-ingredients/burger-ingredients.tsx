import React, { useState } from 'react';
import {
	Tab,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';
import {
	itemsBread,
	itemsFilling,
	itemsSause,
	IItem,
} from './burger-ingredients-data';

type ListProps = {
	items: IItem[];
};

function List({ items }: ListProps) {
	const listItems = items.map((item) => (
		<li className='card'>
			<img src={item.img} className='cardImg'></img>
			<p className='text text_type_main-small price'>
				<div>{item.price.toString()}</div>
				<CurrencyIcon type='primary' />
			</p>
			<p className='text text_type_main-small'>{item.name}</p>
		</li>
	));
	return <ul className='cardsList'>{listItems}</ul>;
}

export const BurgerIngredients = () => {
	const [current, setCurrent] = useState('Булки');

	return (
		<div className='burgerIngredient custom-scroll mt-10'>
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

			<div className='mainMenu'>
				<div className='chapter mt-10'>
					<h2 className='text text_type_main-medium'>Булки</h2>
					<List items={itemsBread}></List>
				</div>
				<div className='chapter mt-10'>
					<h2 className='text text_type_main-medium'>Соусы</h2>
					<List items={itemsSause}></List>
				</div>
				<div className='chapter mt-10'>
					<h2 className='text text_type_main-medium'>Начинки</h2>
					<List items={itemsFilling}></List>
				</div>
			</div>
		</div>
	);
};
