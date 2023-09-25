describe("My React App", () => {
  it("Visits the app", () => {
    cy.visit("http://localhost:5173/");
    cy.title().should("include", "Iqura");
  });
});
