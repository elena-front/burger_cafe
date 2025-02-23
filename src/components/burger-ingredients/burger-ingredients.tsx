import { useState } from 'react';
import {
	Tab,
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';
import { Ingredient } from '../../types';

function List({
	items,
	selectedIds,
}: {
	items: Ingredient[];
	selectedIds: string[];
}) {
	const listItems = items.map((item, index) => {
		const count = selectedIds.filter(
			(selectedId) => item._id === selectedId
		).length;

		return (
			<li key={index} className='card'>
				{count > 0 && (
					<Counter count={count} size='default' extraClass='m-1 counter' />
				)}

				<img src={item.image} className='cardImg'></img>
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

export const BurgerIngredients = ({
	items,
	selectedIds,
}: {
	items: Ingredient[];
	selectedIds: string[];
}) => {
	const [current, setCurrent] = useState('bun');
	const types = [
		{
			value: 'bun',
			title: 'Булки',
		},
		{
			value: 'sauce',
			title: 'Соусы',
		},
		{
			value: 'main',
			title: 'Начинки',
		},
	];

	return (
		<div className='burgerIngredient mt-10'>
			<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
			<div className='tab'>
				{types.map((type) => (
					<Tab
						value={type.value}
						active={current == type.value}
						onClick={setCurrent}>
						{type.title}
					</Tab>
				))}
			</div>
			<div className='mainMenu custom-scroll mt-10'>
				{types.map((type) => (
					<div className='chapter'>
						<h2 className='text text_type_main-medium'>{type.title}</h2>
						<List
							items={items.filter((item) => item.type === type.value)}
							selectedIds={selectedIds}></List>
					</div>
				))}
			</div>
		</div>
	);
};
