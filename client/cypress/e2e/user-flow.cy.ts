describe('user flow and account actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="close-btn"]').click();
  });

  it('logs the user in', () => {
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="showLoginForm-btn"]').click();
    cy.get('[data-cy="email-input"]').type('nirav@mail.com');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="loginSubmit-btn"]').click();

    // expect the logout button to be shown after logging in
    cy.get('[data-cy="logout-btn"]');
  });
});
