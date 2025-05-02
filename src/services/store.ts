import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	AppActions,
	feedConnect,
	feedDisconnect,
	feedError,
	feedMessage,
	profileFeedConnect,
	profileFeedDisconnect,
	profileFeedError,
	profileFeedMessage,
} from './actions';

const feedMiddleware = socketMiddleware({
	connect: feedConnect,
	disconnect: feedDisconnect,
	onError: feedError,
	onMessage: feedMessage,
});

const profileFeedMiddleware = socketMiddleware({
	connect: profileFeedConnect,
	disconnect: profileFeedDisconnect,
	onError: profileFeedError,
	onMessage: profileFeedMessage,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(feedMiddleware, profileFeedMiddleware),
	devTools: true,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
