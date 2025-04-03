import Cookies from 'js-cookie';
import { login, logout, register } from './actions';
import { AppDispatch } from './store';
import { LoginRequest, LoginResponse } from '../types';

export const useAuth = (dispatch: AppDispatch) => {
	const signIn = async (email: string, password: string) => {
		const response = await dispatch(
			login({ email: email, password: password })
		).unwrap();
		if (response.success) {
			Cookies.set('accessToken', response.accessToken.slice('Bearer '.length), {
				expires: new Date(Date.now() + 20 * 60 * 1000),
			});
			Cookies.set('refreshToken', response.refreshToken);
		}
		return response;
	};

	const signOut = async () => {
		const response = await dispatch(logout()).unwrap();
		if (response.success) {
			Cookies.remove('refreshToken');
		}
		return response;
	};

	const signUp = async (name: string, email: string, password: string) => {
		const response = await dispatch(
			register({ name: name, email: email, password: password })
		).unwrap();
		if (response.success) {
			Cookies.set('accessToken', response.accessToken.slice('Bearer '.length), {
				expires: new Date(Date.now() + 20 * 60 * 1000),
			});
			Cookies.set('refreshToken', response.refreshToken);
		}
		return response;
	};

	return {
		signIn,
		signUp,
		signOut,
	};
};
