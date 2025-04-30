import { Feed, OrderDetails, OrderStatus } from '../types';

export const feedOrders: ReadonlyArray<OrderDetails> = [
	{
		number: 34535,
		name: 'Deathstar Starship Main бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa0942',
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa0948',
		],
		status: OrderStatus.CREATED,
		total: 480,
		timestamp: new Date(2025, 4, 24, 16, 20, 0),
	},
	{
		number: 34532,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.COMPLETED,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34533,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.COMPLETED,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34534,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.CANCELED,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34536,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.INPROGRESS,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34537,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.INPROGRESS,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34538,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.INPROGRESS,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34539,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.COMPLETED,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34540,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.INPROGRESS,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
	{
		number: 34541,
		name: 'Interstellar бургер',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa094a',
		],
		status: OrderStatus.INPROGRESS,
		total: 5698,
		timestamp: new Date(2025, 4, 25, 16, 20, 0),
	},
];

export const feed: Feed = {
	orders: feedOrders,
	total: 123456,
	totalToday: 654321,
};
