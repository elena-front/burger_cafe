const baseURL = 'https://norma.nomoreparties.space/api';

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
		}
	}
};

const request = async (path: string, options?: RequestInit): Promise<any> => {
	try {
		const res = await fetch(`${baseURL}/${path}`, options);
		if (res.ok) {
			return await res.json();
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
	if (!response.success) {
		throw new Error(response);
	}

	localStorage.setItem('refreshToken', response.refreshToken);
	localStorage.setItem('accessToken', response.accessToken);
	return response;
};
