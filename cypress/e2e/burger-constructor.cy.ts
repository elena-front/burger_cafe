describe('template spec', () => {
	beforeEach(() => {
		cy.viewport(1280, 960);
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
			fixture: 'ingredients',
		});
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
			fixture: 'user',
		});
		cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
			fixture: 'orders',
		});
		cy.visit('./');
	});

	it('display ingredient details modal', () => {
		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa093c"]').as('bun');
		cy.get('@bun').click();
		cy.wait(500);

		cy.location().should((loc) => {
			expect(loc.hash).to.eq('#/ingredients/643d69a5c3f7b9001cfa093c');
		});

		cy.get('[data-testid="modal-header"]').should(
			'contain.text',
			'Детали ингредиента'
		);

		cy.get('[data-testid="ingredient-name"]').should(
			'contain.text',
			'Краторная булка'
		);

		cy.get('body').type('{esc}');
		cy.get('[data-testid="ingredient-name"]').should('not.exist');
	});

	it('create burger', () => {
		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa093c"]').as('bun');
		cy.get('[data-testid="burger-placeholder-top"]').as('top-placeholder');
		cy.get('@bun').trigger('dragstart');
		cy.get('@top-placeholder').trigger('drop');

		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa0941"]').as('filling');
		cy.get('[data-testid="burger-placeholder"]').as('filling-placeholder');
		cy.get('@filling').trigger('dragstart');
		cy.get('@filling-placeholder').trigger('drop');

		cy.get('.constructor-element:nth(1)').as('first-filling');
		cy.get('@filling').trigger('dragstart');
		cy.get('@first-filling').trigger('drop');

		cy.get('[data-testid="button-put-order"]').click();
		cy.wait(500);
		cy.get('[data-testid="order-number"]').should('have.text', '076781');

		cy.get('body').type('{esc}');
		cy.get('[data-testid="order-number"]').should('not.exist');
	});

	it('change burger ingredients', () => {
		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa093c"]').as('bun-1');
		cy.get('[data-testid="burger-placeholder-top"]').as('top-placeholder');
		cy.get('@bun-1').trigger('dragstart');
		cy.get('@top-placeholder').trigger('drop');

		cy.get('.constructor-element:nth(1)').as('first-filling');

		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa0949"]').as('main-1');
		cy.get('@main-1').trigger('dragstart');
		cy.get('@first-filling').trigger('drop');

		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa0943"]').as('sauce');
		cy.get('@sauce').trigger('dragstart');
		cy.get('@first-filling').trigger('drop');

		cy.get('[href="#/ingredients/643d69a5c3f7b9001cfa0940"]').as('main-2');
		cy.get('@main-2').trigger('dragstart');
		cy.get('@first-filling').trigger('drop');

		cy.get('.constructor-element:nth(0)')
			.as('bun-top')
			.should('contains.text', 'Краторная булка');
		cy.get('.constructor-element:nth(1)')
			.as('filling-1')
			.should('contains.text', 'Мини-салат');
		cy.get('.constructor-element:nth(2)')
			.as('filling-2')
			.should('contains.text', 'Соус фирменный');
		cy.get('.constructor-element:nth(3)')
			.as('filling-3')
			.should('contains.text', 'Говяжий метеорит');
		cy.get('.constructor-element:nth(4)')
			.as('bun-bottom')
			.should('contains.text', 'Краторная булка');

		cy.get('@filling-3').trigger('dragstart');
		cy.get('@filling-1').trigger('drop');
		cy.get('@filling-2').trigger('dragstart');
		cy.get('@filling-3').trigger('drop');

		cy.get('.constructor-element:nth(0)')
			.as('bun-top')
			.should('contains.text', 'Краторная булка');
		cy.get('.constructor-element:nth(1)')
			.as('filling-3')
			.should('contains.text', 'Говяжий метеорит');
		cy.get('.constructor-element:nth(2)')
			.as('filling-1')
			.should('contains.text', 'Мини-салат');
		cy.get('.constructor-element:nth(3)')
			.as('filling-2')
			.should('contains.text', 'Соус фирменный');
		cy.get('.constructor-element:nth(4)')
			.as('bun-bottom')
			.should('contains.text', 'Краторная булка');
	});
});
