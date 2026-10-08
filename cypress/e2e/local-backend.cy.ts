const BUN = '[href="#/ingredients/643d69a5c3f7b9001cfa093c"]';
const FILLING = '[href="#/ingredients/643d69a5c3f7b9001cfa0941"]';

describe('local backend smoke flow', () => {
	it('registers, orders, checks feeds, edits the profile and signs in again', () => {
		const email = `smoke-${Date.now()}@burger.local`;
		const password = 'smoke-password-123';
		const updatedName = 'Smoke User Updated';

		cy.viewport(1280, 960);
		cy.visit('/#/register');
		cy.get('input[name="name"]').type('Smoke User');
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.contains('button', 'Зарегистрироваться').click();
		cy.location('hash').should('eq', '#/');
		cy.window().its('localStorage.accessToken').should('be.a', 'string');

		cy.dragDrop(BUN, '[data-testid="burger-placeholder"]:first');
		cy.dragDrop(FILLING, '[data-testid="burger-placeholder"]:first');
		cy.get('[data-testid="button-put-order"]').click();
		cy.get('[data-testid="order-number"]')
			.invoke('text')
			.should('match', /^\d{6}$/)
			.as('orderNumber');
		cy.get('body').type('{esc}');

		cy.get('@orderNumber').then((orderNumber) => {
			const orderLabel = `#${orderNumber}`;
			cy.contains('a', 'Лента заказов').click();
			cy.contains(orderLabel).should('be.visible');
			cy.contains('a', 'Личный кабинет').click();
			cy.contains('a', 'История заказов').click();
			cy.contains(orderLabel).should('be.visible');
		});

		cy.contains('a', 'Профиль').click();
		cy.get('input[name="name"]').clear().type(updatedName);
		cy.contains('button', 'Сохранить').click();
		cy.get('input[name="name"]').should('have.value', updatedName);
		cy.contains('a', 'Выход').click();
		cy.location('hash').should('eq', '#/login');
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.contains('button', 'Войти').click();
		cy.location('hash').should('eq', '#/');
		cy.contains('a', 'Личный кабинет').click();
		cy.location('hash').should('eq', '#/profile');
		cy.get('input[name="name"]').should('have.value', updatedName);
		cy.window().then((win) => {
			const apiRequests = win.performance
				.getEntriesByType('resource')
				.map((entry) => entry.name)
				.filter((url) => url.includes('/api/'));
			expect(apiRequests).not.to.be.empty;
			expect(
				apiRequests.every((url) => url.startsWith('http://localhost:3000/api/'))
			).to.equal(true);
		});
	});

	it('resets a password through the interface and signs in with the new password', () => {
		const email = `reset-${Date.now()}@burger.local`;
		const newPassword = 'new-smoke-password-123';

		cy.visit('/#/register');
		cy.get('input[name="name"]').type('Reset User');
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type('old-smoke-password-123');
		cy.contains('button', 'Зарегистрироваться').click();
		cy.location('hash').should('eq', '#/');
		cy.contains('a', 'Личный кабинет').click();
		cy.contains('a', 'Выход').click();
		cy.location('hash').should('eq', '#/login');

		cy.contains('a', 'Восстановить пароль').click();
		cy.get('input[name="email"]').type(email);
		cy.contains('button', 'Восстановить').click();
		cy.location('hash').should('eq', '#/reset-password');
		cy.get('input[name="password"]').type(newPassword);
		cy.get('input[name="code"]').type('wrong-code', { force: true });
		cy.contains('button', 'Сохранить').click();
		cy.get('[role="alert"]').should('contain.text', 'Проверьте код');
		cy.get('input[name="code"]').clear().type('000000', { force: true });
		cy.contains('button', 'Сохранить').click();
		cy.location('hash').should('eq', '#/login');
		cy.window().then(
			(win) => expect(win.localStorage.getItem('resetPassword')).to.be.null
		);
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(newPassword);
		cy.contains('button', 'Войти').click();
		cy.location('hash').should('eq', '#/');
	});
});
