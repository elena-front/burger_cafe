import AppHeader from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
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
				if (res.ok) {
					const json = await res.json();
					setState({
						...state,
						ingredients: json.data,
					});
				} else {
					throw new Error(`Error response ${res.status}`);
				}
			} catch (exception) {
				console.error('error fetching API', exception);
			}
		};

		getIngredients();
	}, []);

	const myBun = state.ingredients.find((item) => item.type === 'bun');
	const myFilling = state.ingredients.filter((item) => item.type !== 'bun');

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.burgerSet}>
				<BurgerIngredients items={state.ingredients} selectedIds={[]} />
				<BurgerConstructor
					bun={myBun}
					filling={myFilling}
					items={state.ingredients}
				/>
			</main>
		</div>
	);
};

export default App;
