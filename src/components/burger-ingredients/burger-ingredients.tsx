import { useCallback, useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { FillingItem, Ingredient, RootState } from '../../types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientsList from './ingredients-list';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	hideIngredientDetails,
	loadIngredients,
	showIngredientDetails,
} from '../../services/actions';
import { shallowEqual } from 'react-redux';

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
};

const apiURL = 'https://norma.nomoreparties.space/api/ingredients';

type SelectedState = {
	ingredients: Ingredient[];
	ingredientDetails: Ingredient | null;
	counts: { [id: string]: number };
};

const BurgerIngredients = () => {
	const { ingredients, ingredientDetails, counts } = useSelector<
		RootState,
		SelectedState
	>((store) => {
		const counts: any = {};
		if (store.burger.bun != null) {
			counts[store.burger.bun._id] = 2;
		}
		for (const fillingItem of store.burger.filling) {
			counts[fillingItem.ingredient._id] =
				(counts[fillingItem.ingredient._id] || 0) + 1;
		}

		return {
			ingredients: store.ingredients,
			ingredientDetails: store.ingredientDetails,
			counts: counts,
		};
	}, shallowEqual);

	const dispatch = useDispatch();

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const res = await fetch(apiURL);
				if (res.ok) {
					const json = await res.json();
					dispatch(loadIngredients(json.data));
				} else {
					throw new Error(`Error status ${res.status}`);
				}
			} catch (exception) {
				console.error('error fetching API', exception);
			}
		};

		getIngredients();
	}, []);

	const [state, setState] = useState<BurgerIngredientsState>({
		current: 'bun',
	});

	const handleItemClick = useCallback((item: Ingredient) => {
		dispatch(showIngredientDetails(item));
	}, []);

	const handleDetailClose = useCallback(() => {
		dispatch(hideIngredientDetails());
	}, []);

	return (
		<>
			{ingredientDetails != null && (
				<Modal onClose={handleDetailClose} title='Детали ингредиента'>
					<IngredientDetails ingredient={ingredientDetails}></IngredientDetails>
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
								items={ingredients.filter((item) => item.type === type.value)}
								counts={counts}
								onItemClick={handleItemClick}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default BurgerIngredients;
