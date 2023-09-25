describe("ToDo App Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it('should have "LocalStorage" radio button checked by default', () => {
    cy.get('input[value="Localstorage"]').should("be.checked");
  });

  it("should select Rest API a radio button", () => {
    cy.get('input[value="Rest API"]').check().should("be.checked");
  });

  it("should add a new ToDo item", () => {
    const todoText = "Test ToDo Item";

    cy.get('input[id="todo-create-form_value"]')
      .type(todoText)
      .should("have.value", todoText);

    cy.get('button[type="submit"]').click();

    cy.contains(todoText).should("exist");

    cy.get('input[id="todo-create-form_value"]').should("have.value", "");
  });
});
