import { IRefreshResponse, IResponse } from '../types';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const requestWithRefresh = async <T extends IResponse>(
	path: string,
	options?: RequestInit
): Promise<T> => {
	try {
		return await request<T>(path, options);
	} catch (exception: unknown) {
		if (exception instanceof Error && exception.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options = {
				...(options || {}),
				headers: {
					...(options?.headers || {}),
					authorization: refreshData.accessToken,
				},
			};
			return await request<T>(path, options);
		}

		throw exception;
	}
};

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
	try {
		const res = await fetch(`${BASE_URL}/${path}`, options);
		if (res.ok) {
			const json = await res.json();
			if ((json as IResponse)?.success === false) {
				throw new Error('Response is not successful');
			}
			return json;
		} else {
			const error = await res.json();
			throw new Error(error);
		}
	} catch (exception) {
		console.error('error fetching API', exception);
		throw exception;
	}
};

const refreshToken = async () => {
	const response = await request<IRefreshResponse>('auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
	localStorage.setItem('refreshToken', response.refreshToken);
	localStorage.setItem('accessToken', response.accessToken);
	return response;
};
