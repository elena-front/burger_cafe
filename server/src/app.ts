import cors from 'cors';
import express, { type Express } from 'express';
import type { ServerConfig } from './config';
import { errorHandler, notFound } from './middleware/error-handler';
import { MemoryStore } from './repositories/memory-store';
import { createAuthRouter } from './routes/auth';
import { createOrdersRouter } from './routes/orders';
import { createPasswordResetRouter } from './routes/password-reset';
import { AuthService } from './services/auth-service';
import { OrderService } from './services/order-service';

export type ServerContext = {
	app: Express;
	store: MemoryStore;
	authService: AuthService;
	orderService: OrderService;
};

export const createApp = (config: ServerConfig): ServerContext => {
	const app = express();
	const store = new MemoryStore();
	const authService = new AuthService(store, config);
	const orderService = new OrderService(store);

	app.disable('x-powered-by');
	app.use(
		cors({
			origin: config.corsOrigin,
			methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);
	app.use(express.json({ limit: '64kb' }));
	app.get('/api/health', (_req, res) =>
		res.json({ success: true, status: 'ok' })
	);
	app.get('/api/ingredients', (_req, res) =>
		res.json({ success: true, data: store.ingredients })
	);
	app.use('/api/auth', createAuthRouter(authService));
	app.use('/api/password-reset', createPasswordResetRouter(authService));
	app.use('/api/orders', createOrdersRouter(authService, orderService));
	app.use(notFound);
	app.use(errorHandler);

	return { app, store, authService, orderService };
};
