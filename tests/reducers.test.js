import {
	addIngredient,
	closeOrderDetails,
	feedMessage,
	getOrderByNumber,
	loadIngredients,
	login,
	logout,
	register,
	getUserInfo,
	updateUserInfo,
	moveFilling,
	placeOrder,
	profileFeedMessage,
	removeFilling,
} from '../src/services/actions';
import { burgerReducer, emptyFeed, feedProfileReducer, feedReducer, ingredientsReducer, loadingReducer, newOrderReducer, ordersReducer, userReducer } from '../src/services/reducers';
import { expect, it, describe } from '@jest/globals';

const bun1 = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

const bun2 = {
	_id: '643d69a5c3f7b9001cfa093d',
	name: 'Флюоресцентная булка R2-D3',
	type: 'bun',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/bun-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
	__v: 0,
};

const sauce1 = {
	_id: '643d69a5c3f7b9001cfa0943',
	name: 'Соус фирменный Space Sauce',
	type: 'sauce',
	proteins: 50,
	fat: 22,
	carbohydrates: 11,
	calories: 14,
	price: 80,
	image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
	__v: 0,
};

const order = {
	"ingredients": [
		{
			"_id": "643d69a5c3f7b9001cfa093d",
			"name": "Флюоресцентная булка R2-D3",
			"type": "bun",
			"proteins": 44,
			"fat": 26,
			"carbohydrates": 85,
			"calories": 643,
			"price": 988,
			"image": "https://code.s3.yandex.net/react/code/bun-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
			"__v": 0
		},
		{
			"_id": "643d69a5c3f7b9001cfa093e",
			"name": "Филе Люминесцентного тетраодонтимформа",
			"type": "main",
			"proteins": 44,
			"fat": 26,
			"carbohydrates": 85,
			"calories": 643,
			"price": 988,
			"image": "https://code.s3.yandex.net/react/code/meat-03.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
			"__v": 0
		},
		{
			"_id": "643d69a5c3f7b9001cfa0941",
			"name": "Биокотлета из марсианской Магнолии",
			"type": "main",
			"proteins": 420,
			"fat": 142,
			"carbohydrates": 242,
			"calories": 4242,
			"price": 424,
			"image": "https://code.s3.yandex.net/react/code/meat-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
			"__v": 0
		},
		{
			"_id": "643d69a5c3f7b9001cfa093d",
			"name": "Флюоресцентная булка R2-D3",
			"type": "bun",
			"proteins": 44,
			"fat": 26,
			"carbohydrates": 85,
			"calories": 643,
			"price": 988,
			"image": "https://code.s3.yandex.net/react/code/bun-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
			"__v": 0
		}
	],
	"_id": "68239cbbc2f30c001cb236e8",
	"owner": {
		"name": "test-user",
		"email": "test-111@yandex.ru",
		"createdAt": "2025-04-03T09:27:04.239Z",
		"updatedAt": "2025-04-03T09:28:06.838Z"
	},
	"status": "done",
	"name": "Флюоресцентный люминесцентный био-марсианский бургер",
	"createdAt": "2025-05-13T19:25:47.191Z",
	"updatedAt": "2025-05-13T19:25:48.245Z",
	"number": 77033,
	"price": 3388
};

const orderResponse = {
	"success": true,
	"name": "Флюоресцентный люминесцентный био-марсианский бургер",
	"order": order
};

const feed = {
	"orders": [
		order
	],
	"total": 76659,
	"totalToday": 59
};

const feedResponse = { ...feed, "success": true };

const orderByNumberResponse = { "orders": [order], "success": true };

const user = {
	"name": "test-user",
	"email": "test-111@yandex.ru"
};

const tokens = {
	"accessToken": "access",
	"rereshToken": "refresh"
};

describe('burger reducer', () => {
	it('initial', () => {
		expect(burgerReducer(undefined, {})).toEqual({ bun: null, filling: [] })
	})

	it('add bun', () => {
		const initialState = { bun: null, filling: [] };
		expect(burgerReducer(initialState, addIngredient({ ingredient: bun1, uid: 'abcd' })))
			.toEqual({ bun: bun1, filling: [], });
	});

	it('add filling without bun', () => {
		const initialState = { bun: null, filling: [] };
		expect(burgerReducer(initialState, addIngredient({ ingredient: sauce1, uid: 'qwer' })))
			.toEqual(initialState);
	});

	it('add filling with bun', () => {
		expect(burgerReducer({ bun: bun1, filling: [] }, addIngredient({ ingredient: sauce1, uid: 'qwer' })))
			.toEqual({ bun: bun1, filling: [{ ingredient: sauce1, uid: 'qwer' }] });
	});

	it('add multiple buns', () => {
		expect(burgerReducer({ bun: bun1, filling: [] }, addIngredient({ ingredient: bun2, uid: 'asdf' })))
			.toEqual({ bun: bun2, filling: [] });
	});

	it('add multiple fillings', () => {
		expect(burgerReducer({ bun: bun1, filling: [{ ingredient: sauce1, uid: '11' }] }, addIngredient({ ingredient: sauce1, uid: '22' })))
			.toEqual({ bun: bun1, filling: [{ ingredient: sauce1, uid: '11' }, { ingredient: sauce1, uid: '22' }] });
	});

	it('remove filling', () => {
		const initialState = { bun: bun1, filling: [{ ingredient: sauce1, uid: '10' }] };
		expect(burgerReducer(initialState, removeFilling('10')))
			.toEqual({ bun: bun1, filling: [] });
	});

	it('remove invalid filling', () => {
		const initialState = { bun: bun1, filling: [] };
		expect(burgerReducer(initialState, removeFilling('22')))
			.toEqual({ bun: bun1, filling: [] });
	});

	it('move filling', () => {
		const initialState = { bun: bun1, filling: [{ ingredient: sauce1, uid: 'a' }, { ingredient: sauce1, uid: 'b' }] };
		expect(burgerReducer(initialState, moveFilling({ source: 'b', dest: 'a' })))
			.toEqual({ bun: bun1, filling: [{ ingredient: sauce1, uid: 'b' }, { ingredient: sauce1, uid: 'a' }] });
	});

	it('move filling with invalid uid', () => {
		const initialState = { bun: bun1, filling: [{ ingredient: sauce1, uid: '10' }, { ingredient: sauce1, uid: '20' }] };
		expect(burgerReducer(initialState, moveFilling({ source: '10', dest: '55' })))
			.toEqual(initialState);
	});

	it('clear burger after order placed', () => {
		const initialState = { bun: bun1, filling: [{ ingredient: sauce1, uid: '10' }, { ingredient: sauce1, uid: '20' }] };
		expect(burgerReducer(initialState, placeOrder.fulfilled))
			.toEqual({ bun: null, filling: [] });
	});
});

describe('ingredients reducer', () => {
	it('init state', () => {
		expect(ingredientsReducer(undefined, {}))
			.toEqual([])
	});

	it('load ingredients', () => {
		expect(ingredientsReducer([], loadIngredients.fulfilled([bun1, sauce1])))
			.toEqual([bun1, sauce1])
	});
});

describe('new order reducer', () => {
	it('init state', () => {
		expect(newOrderReducer(undefined, {}))
			.toEqual(null);
	});

	it('order created', () => {
		expect(newOrderReducer(null, placeOrder.fulfilled(orderResponse)))
			.toEqual(order);
	});

	it('close order', () => {
		expect(newOrderReducer(order, closeOrderDetails))
			.toEqual(null);
	});

	it('order create failed', () => {
		expect(newOrderReducer(null, placeOrder.rejected))
			.toEqual(null);
	});
})

describe('loading reducer', () => {
	it('init state', () => {
		expect(loadingReducer(undefined, {}))
			.toEqual(false);
	});

	it('pending order', () => {
		expect(loadingReducer(false, placeOrder.pending))
			.toEqual(true);
	});

	it('failed order', () => {
		expect(loadingReducer(true, placeOrder.rejected))
			.toEqual(false);
	});

	it('done order', () => {
		expect(loadingReducer(true, placeOrder.fulfilled(orderResponse)))
			.toEqual(false);
	});
})

describe('feed reducer', () => {
	it('init state', () => {
		expect(feedReducer(undefined, {}))
			.toEqual(emptyFeed)
	});

	it('load feed', () => {
		expect(feedReducer(emptyFeed, feedMessage(feedResponse)))
			.toEqual(feed)
	});

	it('load profile feed', () => {
		expect(feedReducer(emptyFeed, profileFeedMessage(feedResponse)))
			.toEqual(emptyFeed);
	});
});

describe('feed profile reducer', () => {
	it('init state', () => {
		expect(feedProfileReducer(undefined, {}))
			.toEqual(emptyFeed);
	});

	it('load feed', () => {
		expect(feedProfileReducer(emptyFeed, feedMessage(feedResponse)))
			.toEqual(emptyFeed);
	});

	it('load profile feed', () => {
		expect(feedProfileReducer(emptyFeed, profileFeedMessage(feedResponse)))
			.toEqual(feed);
	});
});

describe('orders reducer', () => {
	it('init state', () => {
		expect(ordersReducer(undefined, {}))
			.toEqual([]);
	});

	it('get order by number', () => {
		expect(ordersReducer([], getOrderByNumber.fulfilled(orderByNumberResponse)))
			.toEqual([order]);
	});
});

describe('user reducer', () => {
	it('init state', () => {
		expect(userReducer(undefined, {}))
			.toEqual(null);
	});

	it('login', () => {
		expect(userReducer(null, login.fulfilled({ "success": true, "user": user, ...tokens })))
			.toEqual(user);
	});

	it('register', () => {
		expect(userReducer(null, register.fulfilled({ "success": true, "user": user, ...tokens })))
			.toEqual(user);
	});

	it('logout', () => {
		expect(userReducer(user, logout.fulfilled({ "success": true })))
			.toEqual(null);
	});

	it('get user info', () => {
		expect(userReducer(null, getUserInfo.fulfilled({ "success": true, "user": user, ...tokens })))
			.toEqual(user);
	});

	it('update user info', () => {
		expect(userReducer(null, updateUserInfo.fulfilled({ "success": true, "user": user, ...tokens })))
			.toEqual(user);
	})
});

