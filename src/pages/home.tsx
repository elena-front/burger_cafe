import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './styles.module.css';
import OrderAcceptedModal from '../components/order-accepted/order-accepted-modal';

export function Home() {
	return (
		<div>
			<OrderAcceptedModal />
			<main className={styles.burgerSet}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</div>
	);
}
