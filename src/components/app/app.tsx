import AppHeader from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import './app.css';
import { useEffect, useState } from 'react';
import { Ingredient } from '../../types';

const apiURL = 'https://norma.nomoreparties.space/api/ingredients';

type AppState = {
	ingredients: Ingredient[];
};

const App = () => {
	const [state, setState] = useState<AppState>({
		ingredients: [],
	});

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const res = await fetch(apiURL);
				if (res.status === 200) {
					const json = await res.json();
					setState({
						...state,
						ingredients: json.data,
					});
				}
			} catch (exception) {
				console.error('error fetching API', exception);
			}
		};

		getIngredients();
	}, []);

	return (
		<div className='app'>
			<AppHeader />
			<div className='burgerSet'>
				<BurgerIngredients items={state.ingredients} selectedIds={[]} />
				<BurgerConstructor items={state.ingredients} />
			</div>
		</div>
	);
};

export default App;
