import { requestWithRefresh } from '../src/utils';

test('refreshes an expired access token and retries the original request', async () => {
	localStorage.setItem('refreshToken', 'old-refresh-token');
	const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
		ok: false,
		json: async () => ({ success: false, message: 'jwt expired' }),
	});
	fetchMock.mockResolvedValueOnce({
		ok: true,
		json: async () => ({
			success: true,
			accessToken: 'Bearer new-access-token',
			refreshToken: 'new-refresh-token',
		}),
	});
	fetchMock.mockResolvedValueOnce({
		ok: true,
		json: async () => ({ success: true, user: { name: 'Demo User' } }),
	});
	const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

	try {
		await expect(
			requestWithRefresh('auth/user', {
				headers: { authorization: 'Bearer expired-access-token' },
			})
		).resolves.toMatchObject({ user: { name: 'Demo User' } });
		expect(fetchMock).toHaveBeenNthCalledWith(
			2,
			'http://localhost:3000/api/auth/token',
			expect.objectContaining({
				body: JSON.stringify({ token: 'old-refresh-token' }),
			})
		);
		expect(fetchMock).toHaveBeenNthCalledWith(
			3,
			'http://localhost:3000/api/auth/user',
			expect.objectContaining({
				headers: { authorization: 'Bearer new-access-token' },
			})
		);
		expect(localStorage.getItem('accessToken')).toBe('new-access-token');
		expect(localStorage.getItem('refreshToken')).toBe('new-refresh-token');
	} finally {
		fetchMock.mockRestore();
		consoleSpy.mockRestore();
		localStorage.clear();
	}
});
