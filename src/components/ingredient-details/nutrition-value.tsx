import { NutritionValueProps } from './ingredient-details';
import styles from './nutrition-value.module.css';

const NutritionValue = ({ name, value }: NutritionValueProps) => {
	return (
		<div className={styles.detailsColumn}>
			<div className='text text_type_main-default text_color_inactive'>
				{name}
			</div>
			<div className='text text_type_digits-default text_color_inactive'>
				{value.toString()}
			</div>
		</div>
	);
};

export default NutritionValue;
