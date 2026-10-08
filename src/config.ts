export const API_BASE_URL = (
	process.env.API_BASE_URL ?? 'http://localhost:3000/api'
).replace(/\/$/, '');

export const WS_BASE_URL = (
	process.env.WS_BASE_URL ?? 'ws://localhost:3000'
).replace(/\/$/, '');
