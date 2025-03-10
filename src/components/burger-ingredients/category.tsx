import styles from './category.module.css';
import { Ingredient } from '../../types';
import IngredientCard from './ingredient-card';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../hooks';

type CategoryProps = {
	title: string;
	value: string;
};

const Category = ({ title, value }: CategoryProps) => {
	const items = useAppSelector<Ingredient[]>(
		(state) => state.ingredients.filter((item) => item.type === value),
		shallowEqual
	);

	return (
		<div className={styles.chapter} data-category={value}>
			<h2 className='text text_type_main-medium'>{title}</h2>
			<ul className={styles.cardsList + ' pl-4 pt-6 pb-2'}>
				{items.map((item) => (
					<IngredientCard ingredient={item} key={item._id} />
				))}
			</ul>
		</div>
	);
};

export default Category;
