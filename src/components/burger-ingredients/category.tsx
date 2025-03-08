import { useSelector } from 'react-redux';
import styles from './category.module.css';
import { Ingredient } from '../../types';
import IngredientCard from './ingredient-card';
import { RootState } from '../../services/store';

type SelectedState = {
	items: Ingredient[];
};

type CategoryProps = {
	title: string;
	value: string;
};

const Category = ({ title, value }: CategoryProps) => {
	const { items } = useSelector<RootState, SelectedState>((state) => {
		return {
			items: state.ingredients.filter((item) => item.type === value),
		};
	});

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
