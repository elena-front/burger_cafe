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

const dayDiff = (date1: Date, date2: Date): number => {
	const t1 = Date.UTC(
		date1.getUTCFullYear(),
		date1.getUTCMonth(),
		date1.getUTCDate()
	);
	const t2 = Date.UTC(
		date2.getUTCFullYear(),
		date2.getUTCMonth(),
		date2.getUTCDate()
	);
	return Math.floor((t1 - t2) / (1000 * 60 * 60 * 24));
};

export const getRelativeDateTime = (date: Date): string => {
	return `${getRelativeDate(date)}, ${toShortTime(date)}`;
};

const getRelativeDate = (date: Date): string => {
	const now = new Date();
	const days = dayDiff(now, date);
	if (days === 0) {
		return 'Сегодня';
	}

	if (days === 1) {
		return 'Вчера';
	}

	const remain = days % 10;
	if (remain === 1) {
		return `${days} день назад`;
	}

	if (remain >= 2 && remain <= 4) {
		return `${days} дня назад`;
	}

	return `${days} дней назад`;
};

const toShortTime = (date: Date): string => {
	return `${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
};
