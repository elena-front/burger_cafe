import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import './styles.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { initialState, rootReducer } from './services/reducers';
import { Provider } from 'react-redux';

const composeEnhancers =
	typeof window === 'object' &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers();

const store = createStore(rootReducer, initialState, enhancer);

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
