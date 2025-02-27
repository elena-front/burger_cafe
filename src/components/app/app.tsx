import AppHeader from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import './app.css';
import { useEffect, useState } from 'react';
import { Ingredient } from '../../types';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

type AppState = {
	ingredients: Ingredient[];
};

export const App = () => {
	const [state, setState] = useState<AppState>({
		ingredients: [],
	});

	useEffect(() => {
		const getIngredients = async () => {
			const res = await fetch(API_URL);
			const json = await res.json();
			setState({
				ingredients: json.data,
			});
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
