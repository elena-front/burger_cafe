const baseURL = 'https://norma.nomoreparties.space/api';

export const request = async (url: string, options?: RequestInit) => {
	try {
		const res = await fetch(`${baseURL}/${url}`, options);
		if (res.ok) {
			return await res.json();
		} else {
			throw new Error(`Error status ${res.status}`);
		}
	} catch (exception) {
		console.error('error fetching API', exception);
	}
};
