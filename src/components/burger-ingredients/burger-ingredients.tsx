import { useCallback, useState } from 'react';
import {
	Tab,
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';
import { Ingredient } from '../../types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const categories = [
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

type ListProps = {
	items: Ingredient[];
	selectedIds: string[];
	onItemClick: (item: Ingredient) => void;
};

const List = ({ items, selectedIds, onItemClick }: ListProps) => {
	const listItems = items.map((item, index) => {
		const count = selectedIds.filter(
			(selectedId) => item._id === selectedId
		).length;

		return (
			<li key={index} className='card' onClick={() => onItemClick(item)}>
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
};

type BurgerIngredientsState = {
	current: string;
	selected?: Ingredient;
};

type BurgerIngredientsProps = {
	items: Ingredient[];
	selectedIds: string[];
};

export const BurgerIngredients = ({
	items,
	selectedIds,
}: BurgerIngredientsProps) => {
	const [state, setState] = useState<BurgerIngredientsState>({
		current: 'bun',
		selected: undefined,
	});

	const handleItemClick = useCallback((item: Ingredient) => {
		setState({ ...state, selected: item });
	}, []);

	const handleDetailClose = useCallback(() => {
		setState({ ...state, selected: undefined });
	}, []);

	return (
		<>
			{state.selected != null && (
				<Modal onClose={handleDetailClose} title='Детали ингредиента'>
					<IngredientDetails ingredient={state.selected}></IngredientDetails>
				</Modal>
			)}
			<div className='burgerIngredient mt-10'>
				<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
				<div className='tab'>
					{categories.map((type) => (
						<Tab
							value={type.value}
							active={state.current == type.value}
							onClick={(v) => setState({ ...state, current: v })}>
							{type.title}
						</Tab>
					))}
				</div>
				<div className='mainMenu custom-scroll mt-10'>
					{categories.map((type) => (
						<div className='chapter'>
							<h2 className='text text_type_main-medium'>{type.title}</h2>
							<List
								items={items.filter((item) => item.type === type.value)}
								selectedIds={selectedIds}
								onItemClick={handleItemClick}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
