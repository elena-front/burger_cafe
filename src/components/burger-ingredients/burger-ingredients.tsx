import { useCallback, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Ingredient } from '../../types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientsList from './ingredients-list';

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
			<div className={styles.burgerIngredient + ' mt-10'}>
				<h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
				<div className={styles.tab}>
					{categories.map((type, index) => (
						<Tab
							key={index}
							value={type.value}
							active={state.current == type.value}
							onClick={(v) => setState({ ...state, current: v })}>
							{type.title}
						</Tab>
					))}
				</div>
				<div className={styles.mainMenu + ' custom-scroll mt-10'}>
					{categories.map((type, index) => (
						<div className={styles.chapter} key={index}>
							<h2 className='text text_type_main-medium'>{type.title}</h2>
							<IngredientsList
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
