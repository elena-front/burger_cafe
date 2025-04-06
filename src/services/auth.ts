import { login, logout, register } from './actions';
import { AppDispatch } from './store';

export const useAuth = (dispatch: AppDispatch) => {
	const signIn = async (email: string, password: string) => {
		const response = await dispatch(
			login({ email: email, password: password })
		).unwrap();
		if (response.success) {
			localStorage.setItem(
				'accessToken',
				response.accessToken.slice('Bearer '.length)
			);
			localStorage.setItem('refreshToken', response.refreshToken);
		}
		return response;
	};

	const signOut = async () => {
		const response = await dispatch(logout()).unwrap();
		if (response.success) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		}
		return response;
	};

	const signUp = async (name: string, email: string, password: string) => {
		const response = await dispatch(
			register({ name: name, email: email, password: password })
		).unwrap();
		if (response.success) {
			localStorage.setItem(
				'accessToken',
				response.accessToken.slice('Bearer '.length)
			);
			localStorage.setItem('refreshToken', response.refreshToken);
		}
		return response;
	};

	return {
		signIn,
		signUp,
		signOut,
	};
};
