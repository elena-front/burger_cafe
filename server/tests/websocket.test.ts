import { createServer, type Server } from 'node:http';
import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { WebSocket } from 'ws';
import { createApp, type ServerContext } from '../src/app';
import type { ServerConfig } from '../src/config';
import { FeedServer } from '../src/websocket/feed-server';

const config: ServerConfig = {
	port: 0,
	corsOrigin: 'http://localhost:8080',
	jwtSecret: 'test-secret',
	accessTokenTtl: '15m',
	resetCode: '000000',
};

const nextMessage = <T>(socket: WebSocket): Promise<T> =>
	new Promise((resolve, reject) => {
		socket.once('message', (data) => resolve(JSON.parse(data.toString()) as T));
		socket.once('error', reject);
	});

describe('order WebSocket feeds', () => {
	let context: ServerContext;
	let httpServer: Server;
	let feedServer: FeedServer;
	let baseUrl: string;
	const sockets: WebSocket[] = [];

	beforeEach(async () => {
		context = createApp(config);
		httpServer = createServer(context.app);
		feedServer = new FeedServer(
			httpServer,
			context.store,
			context.authService,
			context.orderService
		);
		await new Promise<void>((resolve) =>
			httpServer.listen(0, '127.0.0.1', resolve)
		);
		const address = httpServer.address();
		if (!address || typeof address === 'string')
			throw new Error('Missing test server address');
		baseUrl = `ws://127.0.0.1:${address.port}`;
	});

	afterEach(async () => {
		for (const socket of sockets) socket.terminate();
		sockets.length = 0;
		await feedServer.close();
		await new Promise<void>((resolve) => httpServer.close(() => resolve()));
	});

	test('sends public and owner-filtered snapshots', async () => {
		const login = await request(context.app)
			.post('/api/auth/login')
			.send({ email: 'demo@burger.local', password: 'demo12345' });
		const token = login.body.accessToken.slice('Bearer '.length);
		const publicSocket = new WebSocket(`${baseUrl}/orders/all`);
		const privateSocket = new WebSocket(`${baseUrl}/orders?token=${token}`);
		sockets.push(publicSocket, privateSocket);

		const [publicFeed, privateFeed] = await Promise.all([
			nextMessage<{ orders: Array<{ _id: string }> }>(publicSocket),
			nextMessage<{ orders: Array<{ _id: string }> }>(privateSocket),
		]);
		expect(publicFeed.orders).toHaveLength(12);
		expect(privateFeed.orders).toHaveLength(5);
	});

	test('rejects an invalid private-feed token', async () => {
		const socket = new WebSocket(`${baseUrl}/orders?token=invalid`);
		sockets.push(socket);
		await expect(nextMessage(socket)).resolves.toEqual({
			success: false,
			message: 'Invalid or missing token',
		});
		await new Promise<void>((resolve) =>
			socket.once('close', (code) => {
				expect(code).toBe(1008);
				resolve();
			})
		);
	});

	test('broadcasts a newly created order to public and private feeds', async () => {
		const login = await request(context.app)
			.post('/api/auth/login')
			.send({ email: 'demo@burger.local', password: 'demo12345' });
		const token = login.body.accessToken.slice('Bearer '.length);
		const publicSocket = new WebSocket(`${baseUrl}/orders/all`);
		const privateSocket = new WebSocket(`${baseUrl}/orders?token=${token}`);
		sockets.push(publicSocket, privateSocket);
		await Promise.all([nextMessage(publicSocket), nextMessage(privateSocket)]);

		const publicUpdate = nextMessage<{ orders: unknown[] }>(publicSocket);
		const privateUpdate = nextMessage<{ orders: unknown[] }>(privateSocket);
		await request(context.app)
			.post('/api/orders')
			.set('Authorization', login.body.accessToken)
			.send({
				ingredients: [
					'643d69a5c3f7b9001cfa093c',
					'643d69a5c3f7b9001cfa0941',
					'643d69a5c3f7b9001cfa093c',
				],
			})
			.expect(201);
		await expect(publicUpdate).resolves.toMatchObject({
			orders: expect.any(Array),
		});
		await expect(privateUpdate).resolves.toMatchObject({
			orders: expect.any(Array),
		});
		expect((await publicUpdate).orders).toHaveLength(13);
		expect((await privateUpdate).orders).toHaveLength(6);
	});
});
