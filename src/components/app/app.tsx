import AppHeader from '../app-header/app-header';

import styles from './app.module.css';

import IngredientDetailsModal from '../ingredient-details/ingredient-details-modal';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login';
import { ForgotPassword } from '../../pages/forgot-password';
import { IngredientDetailsPage } from '../../pages/ingredient-details-page';
import { Home } from '../../pages/home';
import { Profile } from '../../pages/profile';
import { Register } from '../../pages/register';
import { ResetPassword } from '../../pages/reset-password';
import { NotFound404 } from '../../pages/not-found404';
import { ProtectedRouteElement } from '../protected-route-component/protected-route-component';
import { useEffect } from 'react';
import {
	feedConnect,
	feedDisconnect,
	getUserInfo,
	loadIngredients,
} from '../../services/actions';
import { useAppDispatch } from '../hooks';
import { Account } from '../account/account';
import { Feed } from '../../pages/feed';
import OrderInfoPage from '../../pages/order-info-page';
import { OrderHistoryPage } from '../../pages/order-history-page';
import OrderInfoModal from '../order-info/order-info-modal';

const FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';

const App = () => {
	const location = useLocation();
	const background = location.state?.background;

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
		dispatch(loadIngredients());
		dispatch(feedConnect(FEED_WS_URL));
		return () => {
			dispatch(feedDisconnect());
		};
	}, []);

	return (
		<>
			<div className={styles.app}>
				<AppHeader />
				<main className={styles.content}>
					<Routes location={background || location}>
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route
							path='/ingredients/:id'
							element={<IngredientDetailsPage />}
						/>
						<Route
							path='/login'
							element={
								<ProtectedRouteElement
									anonymous={true}
									element={<LoginPage />}
								/>
							}
						/>
						<Route path='/' element={<Home />} />
						<Route
							path='/profile'
							element={<ProtectedRouteElement element={<Profile />} />}>
							<Route path='' element={<Account />} />
							<Route path='orders' element={<OrderHistoryPage />} />
						</Route>
						<Route
							path='/profile/orders/:number'
							element={<ProtectedRouteElement element={<OrderInfoPage />} />}
						/>
						<Route
							path='/register'
							element={
								<ProtectedRouteElement
									anonymous={true}
									element={<Register />}
								/>
							}
						/>
						<Route path='/reset-password' element={<ResetPassword />} />
						<Route path='/feed' element={<Feed />}></Route>
						<Route path='/feed/:number' element={<OrderInfoPage />} />
						<Route path='*' element={<NotFound404 />} />
					</Routes>

					{background && (
						<Routes>
							<Route
								path='/ingredients/:id'
								element={<IngredientDetailsModal />}
							/>
							<Route path='/feed/:number' element={<OrderInfoModal />} />
							<Route
								path='/profile/orders/:number'
								element={<ProtectedRouteElement element={<OrderInfoModal />} />}
							/>
						</Routes>
					)}
				</main>
			</div>
		</>
	);
};

export default App;
