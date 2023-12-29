describe("navigation", () => {
  it("closes welcome modal and navigates to cart page", () => {
    cy.visit("http://localhost:5173/");

    cy.contains("Close").click();

    cy.get('[data-cy="/cart-navtab"]').click();

    cy.url().should("include", "/cart");
  });
});
