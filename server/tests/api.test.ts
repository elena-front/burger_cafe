import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../src/app';
import type { ServerConfig } from '../src/config';

const config: ServerConfig = {
	port: 0,
	corsOrigin: 'http://localhost:8080',
	jwtSecret: 'test-secret',
	accessTokenTtl: '15m',
	resetCode: '000000',
};

const credentials = { email: 'demo@burger.local', password: 'demo12345' };

describe('Burger Cafe HTTP API', () => {
	test('returns health and the complete ingredient catalog', async () => {
		const { app } = createApp(config);
		await request(app)
			.get('/api/health')
			.expect(200, { success: true, status: 'ok' });
		const response = await request(app).get('/api/ingredients').expect(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data).toHaveLength(15);
	});

	test('logs in, authorizes a profile request and rotates refresh tokens', async () => {
		const { app } = createApp(config);
		const login = await request(app)
			.post('/api/auth/login')
			.send(credentials)
			.expect(200);
		expect(login.body.accessToken).toMatch(/^Bearer /);

		await request(app)
			.get('/api/auth/user')
			.set('Authorization', login.body.accessToken)
			.expect(200)
			.expect(({ body }) =>
				expect(body.user).toEqual({
					email: credentials.email,
					name: 'Demo User',
				})
			);

		const refreshed = await request(app)
			.post('/api/auth/token')
			.send({ token: login.body.refreshToken })
			.expect(200);
		expect(refreshed.body.refreshToken).not.toBe(login.body.refreshToken);
		await request(app)
			.post('/api/auth/token')
			.send({ token: login.body.refreshToken })
			.expect(401, { success: false, message: 'Invalid refresh token' });
	});

	test('returns the frontend-compatible message for an expired access token', async () => {
		const { app } = createApp({ ...config, accessTokenTtl: '-1s' });
		const login = await request(app)
			.post('/api/auth/login')
			.send(credentials)
			.expect(200);
		await request(app)
			.get('/api/auth/user')
			.set('Authorization', login.body.accessToken)
			.expect(401, { success: false, message: 'jwt expired' });
	});

	test('registers and validates users without exposing password hashes', async () => {
		const { app } = createApp(config);
		const response = await request(app)
			.post('/api/auth/register')
			.send({
				name: ' Test User ',
				email: ' TEST@example.com ',
				password: 'password123',
			})
			.expect(201);
		expect(response.body.user).toEqual({
			name: 'Test User',
			email: 'test@example.com',
		});
		expect(JSON.stringify(response.body)).not.toContain('passwordHash');

		await request(app)
			.post('/api/auth/register')
			.send({
				name: 'Second',
				email: 'test@example.com',
				password: 'password123',
			})
			.expect(409);
		await request(app)
			.post('/api/auth/register')
			.send({
				name: 'Bad',
				email: 'bad@example.com',
				password: 'short',
				extra: true,
			})
			.expect(400);
	});

	test('resets a password once and revokes existing refresh sessions', async () => {
		const { app } = createApp(config);
		const login = await request(app)
			.post('/api/auth/login')
			.send(credentials)
			.expect(200);
		await request(app)
			.post('/api/password-reset')
			.send({ email: credentials.email })
			.expect(200);
		await request(app)
			.post('/api/password-reset/reset')
			.send({ password: 'new-password', token: '000000' })
			.expect(200);
		await request(app)
			.post('/api/auth/token')
			.send({ token: login.body.refreshToken })
			.expect(401);
		await request(app)
			.post('/api/auth/login')
			.send({ ...credentials, password: 'new-password' })
			.expect(200);
		await request(app)
			.post('/api/password-reset/reset')
			.send({ password: 'another-password', token: '000000' })
			.expect(400);
	});

	test('creates a valid burger and returns it by number', async () => {
		const { app } = createApp(config);
		const login = await request(app)
			.post('/api/auth/login')
			.send(credentials)
			.expect(200);
		const ingredients = [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa0941',
			'643d69a5c3f7b9001cfa093c',
		];
		const created = await request(app)
			.post('/api/orders')
			.set('Authorization', login.body.accessToken)
			.send({ ingredients })
			.expect(201);
		expect(created.body.order).toMatchObject({
			ingredients,
			status: 'pending',
		});
		expect(created.body.order.ownerId).toBeUndefined();

		const fetched = await request(app)
			.get(`/api/orders/${created.body.order.number}`)
			.expect(200);
		expect(fetched.body.orders[0]._id).toBe(created.body.order._id);

		await request(app)
			.post('/api/orders')
			.set('Authorization', login.body.accessToken)
			.send({ ingredients: ingredients.slice(0, 2) })
			.expect(400);
	});

	test('returns JSON for unknown routes', async () => {
		const { app } = createApp(config);
		await request(app)
			.get('/api/missing')
			.expect(404, { success: false, message: 'Route not found' });
	});
});
