import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getUserInfo } from '../../services/actions';

export function ProtectedRouteElement({
	element,
	anonymous = false,
}: {
	element?: React.ReactNode;
	anonymous?: boolean;
}) {
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector<boolean>((store) => store.user != null);

	const [isUserLoaded, setUserLoaded] = useState(isLoggedIn);

	useEffect(() => {
		if (!isUserLoaded) {
			dispatch(getUserInfo())
				.unwrap()
				.catch(() => {})
				.finally(() => setUserLoaded(true));
		}
	}, []);

	const location = useLocation();
	const from = location.state?.from || '/';

	if (!isUserLoaded) {
		return null;
	}

	if (anonymous && isLoggedIn) {
		return <Navigate to={from} />;
	}

	if (!anonymous && !isLoggedIn) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return element;
}
