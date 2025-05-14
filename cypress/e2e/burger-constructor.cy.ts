const BUN_1 = '[href="#/ingredients/643d69a5c3f7b9001cfa093c"]';
const MAIN_1 = '[href="#/ingredients/643d69a5c3f7b9001cfa0949"]';
const MAIN_2 = '[href="#/ingredients/643d69a5c3f7b9001cfa0940"]';
const SAUCE = '[href="#/ingredients/643d69a5c3f7b9001cfa0943"]';
const TOP_BUN = '[data-testid="bun-top"]';
const BOTTOM_BUN = '[data-testid="bun-bottom"]';
const FILLING_1 = '[data-testid*="filling-"]:nth(0)';
const FILLING_2 = '[data-testid*="filling-"]:nth(1)';
const FILLING_3 = '[data-testid*="filling-"]:nth(2)';
const PLACEHOLDER = '[data-testid="burger-placeholder"]:first';
const ORDER_NUMBER = '[data-testid="order-number"]';

describe('template spec', () => {
	beforeEach(() => {
		cy.viewport(1280, 960);
		cy.intercept('GET', 'api/ingredients', {
			fixture: 'ingredients',
		});
		cy.intercept('GET', 'api/auth/user', {
			fixture: 'user',
		});
		cy.intercept('POST', 'api/orders', {
			fixture: 'orders',
		});
		cy.visit('./');
	});

	it('display ingredient details modal', () => {
		cy.get(BUN_1).click();
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
		cy.dragDrop(BUN_1, PLACEHOLDER);
		cy.dragDrop(SAUCE, PLACEHOLDER);
		cy.dragDrop(MAIN_1, FILLING_1);

		cy.get('[data-testid="button-put-order"]').click();
		cy.wait(500);
		cy.get(ORDER_NUMBER).should('have.text', '076781');

		cy.get('body').type('{esc}');
		cy.get(ORDER_NUMBER).should('not.exist');
	});

	it('change burger ingredients', () => {
		cy.dragDrop(BUN_1, PLACEHOLDER);
		cy.dragDrop(MAIN_1, PLACEHOLDER);
		cy.dragDrop(SAUCE, FILLING_1);
		cy.dragDrop(MAIN_2, FILLING_1);

		cy.get(TOP_BUN).should('contains.text', 'Краторная булка');
		cy.get(FILLING_1).should('contains.text', 'Мини-салат');
		cy.get(FILLING_2).should('contains.text', 'Соус фирменный');
		cy.get(FILLING_3).should('contains.text', 'Говяжий метеорит');
		cy.get(BOTTOM_BUN).should('contains.text', 'Краторная булка');

		cy.dragDrop(FILLING_3, FILLING_1);
		cy.wait(500);

		cy.dragDrop(FILLING_2, FILLING_1);
		cy.wait(500);

		cy.get(TOP_BUN).should('contains.text', 'Краторная булка');
		cy.get(FILLING_1).should('contains.text', 'Мини-салат');
		cy.get(FILLING_2).should('contains.text', 'Говяжий метеорит');
		cy.get(FILLING_3).should('contains.text', 'Соус фирменный');
		cy.get(BOTTOM_BUN).should('contains.text', 'Краторная булка');
	});
});
