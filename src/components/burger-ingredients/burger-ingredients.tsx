import { useCallback, useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Category from './category';
import { IngredientType } from '../../types';

type CategoryHeader = {
	readonly value: IngredientType;
	readonly title: string;
};

const categories: ReadonlyArray<CategoryHeader> = [
	{
		value: IngredientType.BUN,
		title: 'Булки',
	},
	{
		value: IngredientType.MAIN,
		title: 'Начинки',
	},
	{
		value: IngredientType.SAUCE,
		title: 'Соусы',
	},
];

type BurgerIngredientsState = {
	readonly current: string;
};

const BurgerIngredients = () => {
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
		scrollRef.current?.addEventListener('scroll', handleScroll);
		return () => {
			scrollRef.current?.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
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
			<div ref={scrollRef} className={styles.mainMenu + ' custom-scroll mt-10'}>
				{categories.map((category) => (
					<Category
						key={category.value}
						title={category.title}
						value={category.value}
					/>
				))}
			</div>
		</div>
	);
};

export default BurgerIngredients;
