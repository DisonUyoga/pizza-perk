describe("Home page", () => {
  it("slider", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-cy="navigate_to_menu"]').contains("Menu");
  });
});
