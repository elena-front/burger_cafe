const BASE_URL = 'https://norma.nomoreparties.space/api';

export const requestWithRefresh = async (
	path: string,
	options?: RequestInit
) => {
	try {
		return await request(path, options);
	} catch (err: any) {
		if (err?.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options = {
				...(options || {}),
				headers: {
					...(options?.headers || {}),
					authorization: refreshData.accessToken,
				},
			};
			return await request(path, options);
		} else {
			throw err;
		}
	}
};

const request = async (path: string, options?: RequestInit): Promise<any> => {
	try {
		const res = await fetch(`${BASE_URL}/${path}`, options);
		if (res.ok) {
			const json = await res.json();
			if (json?.success === false) {
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
	const response = await request('auth/token', {
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
