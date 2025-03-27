import AppHeader from '../app-header/app-header';

import styles from './app.module.css';

import OrderDetailsModal from '../order-details/order-details-modal';
import IngredientDetailsModal from '../ingredient-details/ingredient-details-modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/login';
import { ForgotPassword } from '../pages/forgot-password';
import { Ingredient } from '../pages/ingredient';
import Main from '../pages/main';
import { Profile } from '../pages/profile';
import { Register } from '../pages/register';
import { ResetPassword } from '../pages/reset-password';
import { NotFound } from '../pages/not-found';

const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<OrderDetailsModal />
			<IngredientDetailsModal />

			<Router>
				<Routes>
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/ingredients/:id' element={<Ingredient />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/' element={<Main />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<ResetPassword />} />
					<Route path='/not-found' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
