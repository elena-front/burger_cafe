import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { useState } from 'react';
import { Ingredient } from '../../types';

type AppState = {
	ingredients: Ingredient[];
};

const App = () => {
	const [state] = useState<AppState>({
		ingredients: [],
	});

	const myBun = state.ingredients.find((item) => item.type === 'bun');
	const myFilling = state.ingredients.filter((item) => item.type !== 'bun');

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.burgerSet}>
				<BurgerIngredients selectedIds={[]} />
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
