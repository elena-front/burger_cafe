import type { Server } from 'node:http';
import { WebSocket, WebSocketServer } from 'ws';
import type { MemoryStore } from '../repositories/memory-store';
import type { AuthService } from '../services/auth-service';
import type { OrderService } from '../services/order-service';

type FeedClient = WebSocket & { ownerId?: string };

export class FeedServer {
	private readonly server = new WebSocketServer({ noServer: true });
	private readonly unsubscribe: () => void;

	constructor(
		httpServer: Server,
		private readonly store: MemoryStore,
		private readonly authService: AuthService,
		private readonly orderService: OrderService
	) {
		httpServer.on('upgrade', (request, socket, head) => {
			const url = new URL(request.url ?? '/', 'http://localhost');
			if (url.pathname !== '/orders/all' && url.pathname !== '/orders') {
				socket.destroy();
				return;
			}
			this.server.handleUpgrade(request, socket, head, (ws) => {
				const client = ws as FeedClient;
				if (url.pathname === '/orders') {
					try {
						client.ownerId = this.authService.verifyAccessToken(
							url.searchParams.get('token') ?? ''
						).id;
					} catch {
						client.send(
							JSON.stringify({
								success: false,
								message: 'Invalid or missing token',
							}),
							() => {
								client.close(1008, 'Invalid or missing token');
							}
						);
						return;
					}
				}
				this.server.emit('connection', client, request);
			});
		});
		this.server.on('connection', (client: FeedClient) =>
			this.sendSnapshot(client)
		);
		this.unsubscribe = this.store.onOrdersChanged(() => this.broadcast());
	}

	close(): Promise<void> {
		this.unsubscribe();
		for (const client of this.server.clients) client.terminate();
		return new Promise((resolve) => this.server.close(() => resolve()));
	}

	private sendSnapshot(client: FeedClient): void {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(this.orderService.feed(client.ownerId)));
		}
	}

	private broadcast(): void {
		for (const client of this.server.clients)
			this.sendSnapshot(client as FeedClient);
	}
}
