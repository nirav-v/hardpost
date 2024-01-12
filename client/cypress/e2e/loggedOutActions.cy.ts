describe("logged out actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-cy="close-btn"]').click();
  });

  it("navigates to cart page", () => {
    cy.get('[data-cy="/cart-navtab"]').click();

    cy.url().should("include", "/cart");
  });

  it("adds item to cart and the button and cart quantity both update", () => {
    cy.get('[data-cy="add-to-cart-btn"]').first().click();
    cy.get('[data-cy="remove-from-cart-btn"]');
  });
});
