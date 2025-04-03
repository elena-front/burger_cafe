const baseURL = 'https://norma.nomoreparties.space/api';

export const request = async (path: string, options?: RequestInit) => {
	try {
		const res = await fetch(`${baseURL}/${path}`, options);
		if (res.ok) {
			return await res.json();
		} else {
			throw new Error(`Error status ${res.status}`);
		}
	} catch (exception) {
		console.error('error fetching API', exception);
		throw exception;
	}
};
