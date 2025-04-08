import AppHeader from '../app-header/app-header';

import styles from './app.module.css';

import OrderDetailsModal from '../order-details/order-details-modal';
import IngredientDetailsModal from '../ingredient-details/ingredient-details-modal';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login';
import { ForgotPassword } from '../../pages/forgot-password';
import { Ingredient } from '../../pages/ingredient';
import { Home } from '../../pages/home';
import { Profile } from '../../pages/profile';
import { Register } from '../../pages/register';
import { ResetPassword } from '../../pages/reset-password';
import { NotFound404 } from '../../pages/not-found404';
import { ProtectedRouteElement } from '../protected-route-component/protected-route-component';
import { useEffect } from 'react';
import { getUserInfo, loadIngredients } from '../../services/actions';
import { useAppDispatch } from '../hooks';
import { Account } from '../account/account';

const App = () => {
	const location = useLocation();
	const background = location.state?.background;

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
		dispatch(loadIngredients());
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<OrderDetailsModal />

			<Routes location={background || location}>
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/ingredients/:id' element={<Ingredient />} />
				<Route
					path='/login'
					element={
						<ProtectedRouteElement anonymous={true} element={<LoginPage />} />
					}
				/>
				<Route path='/' element={<Home />} />
				<Route
					path='/profile'
					element={<ProtectedRouteElement element={<Profile />} />}>
					<Route path='' element={<Account />} />
					<Route path='orders' element={<>Здесь будет история заказов</>} />
				</Route>
				<Route
					path='/register'
					element={
						<ProtectedRouteElement anonymous={true} element={<Register />} />
					}
				/>
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{background && (
				<Routes>
					<Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
				</Routes>
			)}
		</div>
	);
};

export default App;
