import { useCallback, MouseEvent } from 'react';
import styles from './profile.module.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../components/hooks';
import { useAuth } from '../services/auth';

export function Profile() {
	const dispatch = useAppDispatch();
	const { signOut } = useAuth(dispatch);
	const navigate = useNavigate();

	const location = useLocation();

	const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		signOut().then(() => navigate('/login'));
	}, []);

	return (
		<div className={styles.profilePage}>
			<div className={styles.navigation}>
				<div className={styles.bar}>
					<Link
						to='/profile'
						className={`text text_type_main-medium ${styles.barItem} ${
							location.pathname == '/profile'
								? 'text_color_primary'
								: 'text_color_inactive'
						}`}>
						Профиль
					</Link>
					<Link
						to='/profile/orders'
						className={`text text_type_main-medium ${styles.barItem} ${
							location.pathname == '/profile/orders'
								? 'text_color_primary'
								: 'text_color_inactive'
						}`}>
						История заказов
					</Link>
					<Link
						onClick={handleClick}
						className='text text_type_main-medium text_color_inactive'
						to={'#'}
						replace>
						Выход
					</Link>
				</div>

				<div className='text text_type_main-default text_color_inactive mt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</div>
			</div>

			<Outlet />
		</div>
	);
}
