import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { User } from '../../types';
import { getUserInfo } from '../../services/actions';

export function ProtectedRouteElement({
	element,
	isAuth,
}: {
	element?: React.ReactNode | null;
	isAuth: boolean;
}) {
	const dispatch = useAppDispatch();

	const user = useAppSelector<User | null>((store) => store.user);

	const [isUserLoaded, setUserLoaded] = useState(user != null);

	useEffect(() => {
		if (!isUserLoaded) {
			dispatch(getUserInfo())
				.unwrap()
				.catch(() => {})
				.finally(() => setUserLoaded(true));
		}
	}, []);

	if (!isUserLoaded) {
		return null;
	}

	if (isAuth) {
		return user ? element : <Navigate to='/login' replace />;
	} else {
		return user ? <Navigate to='/' replace /> : element;
	}
}
