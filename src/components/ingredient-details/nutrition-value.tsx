import { NutritionValueProps } from './ingredient-details';
import './nutrition-value.css';

const NutritionValue = ({ name, value }: NutritionValueProps) => {
	return (
		<div className='detailsColumn'>
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
