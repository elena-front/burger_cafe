import { createServer } from 'node:http';
import { createApp } from './app';
import { loadConfig } from './config';
import { FeedServer } from './websocket/feed-server';

const config = loadConfig();
const { app, store, authService, orderService } = createApp(config);
const httpServer = createServer(app);
const feedServer = new FeedServer(httpServer, store, authService, orderService);

httpServer.listen(config.port, () => {
	console.log(
		`Burger Cafe backend listening on http://localhost:${config.port}`
	);
});

let isShuttingDown = false;
const shutdown = async (exitCode = 0): Promise<void> => {
	if (isShuttingDown) return;
	isShuttingDown = true;
	await feedServer.close();
	await new Promise<void>((resolve) => httpServer.close(() => resolve()));
	process.exit(exitCode);
};

process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());
process.on('uncaughtException', (error) => {
	console.error('Uncaught exception', error);
	void shutdown(1);
});
process.on('unhandledRejection', (error) => {
	console.error('Unhandled rejection', error);
	void shutdown(1);
});
