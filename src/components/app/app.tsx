import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OrderDetailsModal from '../order-details/order-details-modal';
import IngredientDetailsModal from '../ingredient-details/ingredient-details-modal';

const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<OrderDetailsModal />
			<IngredientDetailsModal />
			<main className={styles.burgerSet}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</div>
	);
};

export default App;
