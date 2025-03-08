import { useCallback, useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { Ingredient } from '../../types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadIngredients, hideIngredientDetails } from '../../services/actions';
import { shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import Category from './category';

const categories = [
	{
		value: 'bun',
		title: 'Булки',
	},
	{
		value: 'main',
		title: 'Начинки',
	},
	{
		value: 'sauce',
		title: 'Соусы',
	},
];

type BurgerIngredientsState = {
	current: string;
};

const apiURL = 'https://norma.nomoreparties.space/api/ingredients';

type SelectedState = {
	ingredientDetails: Ingredient | null;
};

const BurgerIngredients = () => {
	const { ingredientDetails } = useSelector<RootState, SelectedState>(
		(store) => {
			return {
				ingredientDetails: store.ingredientDetails,
			};
		},
		shallowEqual
	);

	const dispatch = useDispatch<AppDispatch>();

	const scrollRef = useRef<HTMLDivElement>(null);

	const [state, setState] = useState<BurgerIngredientsState>({
		current: categories[0].value,
	});

	const handleScroll = useCallback(() => {
		const currentTop = scrollRef.current!.scrollTop;
		let minDist = Number.MAX_VALUE;
		let selectedCategory = state.current;
		scrollRef.current!.childNodes.forEach((node) => {
			const childElement = node as Element;
			const dist = Math.abs(
				currentTop - childElement.getBoundingClientRect().top
			);
			if (dist < minDist) {
				minDist = dist;
				const category = childElement.getAttribute('data-category');
				if (category) {
					selectedCategory = category;
				}
			}
		});
		setState({ current: selectedCategory });
	}, [state, setState]);

	useEffect(() => {
		dispatch(loadIngredients(apiURL));
		scrollRef.current?.addEventListener('scroll', handleScroll);
		return () => {
			scrollRef.current?.removeEventListener('scroll', handleScroll);
		};
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
				<div
					ref={scrollRef}
					className={styles.mainMenu + ' custom-scroll mt-10'}>
					{categories.map((category) => (
						<Category
							key={category.value}
							title={category.title}
							value={category.value}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default BurgerIngredients;
