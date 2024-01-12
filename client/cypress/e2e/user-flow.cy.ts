describe("user flow and account actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-cy="close-btn"]').click();
  });

  it("logs the user in", () => {});
});
