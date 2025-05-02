import { RootState } from '../store';
import { Middleware } from 'redux';
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { refreshToken } from '@utils/index';

const RECONNECT_TIMEOUT = 3000;

export type WsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
	onSendMessage?: ActionCreatorWithPayload<S>;
};

export const socketMiddleware = <R, S>(
	wsActions: WsActions<R, S>,
	withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
			onSendMessage,
		} = wsActions;
		let isConnected = false;
		let url = '';
		let reconnectTimer = 0;
		const { dispatch } = store;
		return (next) => (action) => {
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(action.payload);
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_TIMEOUT);
					}
				};

				socket.onerror = () => {
					dispatch(onError('Error'));
				};

				socket.onmessage = (e) => {
					const { data } = e;
					try {
						const parsedData = JSON.parse(data);
						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshedData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshedData.accessToken.slice('Bearer '.length)
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});
							dispatch(disconnect());
							return;
						}
						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				};
			} else if (socket && onSendMessage?.match(action)) {
				try {
					const data = JSON.stringify(action.payload);
					socket.send(data);
				} catch (error) {
					dispatch(onError((error as Error).message));
				}
			} else if (socket && disconnect?.match(action)) {
				clearTimeout(reconnectTimer);
				reconnectTimer = 0;
				isConnected = false;
				socket.close();
				socket = null;
			} else {
				next(action);
			}
		};
	};
};
