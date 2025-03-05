import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import './app.css';
import { useState } from 'react';
import { Ingredient } from '../../types';

type AppProps = {
	loadIngredients: (ingredients: Ingredient[]) => void;
};

type AppState = {
	ingredients: Ingredient[];
};

const App = () => {
	const [state] = useState<AppState>({
		ingredients: [],
	});

	return (
		<div className='app'>
			<AppHeader />
			<div className='burgerSet'>
				<BurgerIngredients selectedIds={[]} />
				<BurgerConstructor items={state.ingredients} />
			</div>
		</div>
	);
};

export default App;
