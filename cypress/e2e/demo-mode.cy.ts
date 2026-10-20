const demoSuite = Cypress.env('DEMO_MODE') === true ? describe : describe.skip;

demoSuite('published demo mode', () => {
	it('signs in, keeps the profile after reload, and shows demo orders', () => {
		cy.intercept('http://localhost:3000/api/**').as('localApi');
		cy.visit('/#/login');
		cy.contains('Демо-режим: demo@burger.local / demo12345').should(
			'be.visible'
		);
		cy.get('input[name="email"]').type('demo@burger.local');
		cy.get('input[name="password"]').type('demo12345');
		cy.contains('button', 'Войти').click();
		cy.location('hash').should('eq', '#/');
		cy.contains('a', 'Личный кабинет').click();
		cy.location('hash').should('eq', '#/profile');
		cy.get('input[name="email"]').should('have.value', 'demo@burger.local');
		cy.reload();
		cy.get('input[name="email"]').should('have.value', 'demo@burger.local');
		cy.contains('a', 'История заказов').click();
		cy.contains('#041000').should('exist');
		cy.get('@localApi.all').should('have.length', 0);
	});

	it('shows an error for an incorrect password', () => {
		cy.visit('/#/login');
		cy.get('input[name="email"]').type('demo@burger.local');
		cy.get('input[name="password"]').type('incorrect-password');
		cy.contains('button', 'Войти').click();
		cy.get('[role="alert"]').should(
			'contain.text',
			'Неверный email или пароль'
		);
		cy.location('hash').should('eq', '#/login');
	});

	it('creates an order and shows it in the personal history', () => {
		cy.viewport(1280, 960);
		cy.visit('/#/login');
		cy.get('input[name="email"]').type('demo@burger.local');
		cy.get('input[name="password"]').type('demo12345');
		cy.contains('button', 'Войти').click();
		cy.location('hash').should('eq', '#/');
		cy.dragDrop(
			'[href="#/ingredients/643d69a5c3f7b9001cfa093c"]',
			'[data-testid="burger-placeholder"]:first'
		);
		cy.dragDrop(
			'[href="#/ingredients/643d69a5c3f7b9001cfa0941"]',
			'[data-testid="burger-placeholder"]:first'
		);
		cy.get('[data-testid="button-put-order"]').click();
		cy.get('[data-testid="order-number"]')
			.invoke('text')
			.should('match', /^\d{6}$/)
			.as('orderNumber');
		cy.get('body').type('{esc}');
		cy.contains('a', 'Личный кабинет').click();
		cy.contains('a', 'История заказов').click();
		cy.get('@orderNumber').then((number) => {
			cy.contains(`#${number}`).should('exist');
		});
	});
});
