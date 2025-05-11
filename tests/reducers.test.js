import {
	addIngredient,
	moveFilling,
	placeOrder,
	removeFilling,
} from '../src/services/actions';
import { burgerReducer } from '../src/services/reducers';
import { expect, it } from '@jest/globals';

const { describe } = require('@jest/globals');

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
