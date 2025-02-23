import AppHeader from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import './app.css';
import { ingredients, myBurger } from '../../utils/data';

export const App = () => {
	const selectedIngredients = myBurger.map(
		(id) => ingredients.find((ingredient) => ingredient._id === id)!
	);

	return (
		<div className='app'>
			<AppHeader />
			<div className='burgerSet'>
				<BurgerIngredients items={ingredients} selectedIds={myBurger} />
				<BurgerConstructor items={selectedIngredients} />
			</div>
		</div>
	);
};
