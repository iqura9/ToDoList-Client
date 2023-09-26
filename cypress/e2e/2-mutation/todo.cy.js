describe("ToDo App Mutation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    const testData = ["Test ToDo Item 1", "Test ToDo Item 2"];

    testData.forEach((text) => {
      cy.get('input[id="todo-create-form_value"]')
        .type(text)
        .should("have.value", text);
      cy.get('button[type="submit"]').click();
    });
  });

  it("should delete item", () => {
    cy.get('input[class="ant-checkbox-input"]').eq(1).click();
    cy.get('input[class="ant-checkbox-input"]').eq(2).click();

    cy.get('[data-testid="submit_button"]').click();

    cy.get(".ant-empty-image").should("exist");
    cy.get(".ant-empty-description").should("exist");
  });

  it("should update item", () => {
    const expectedRowCount = 2;
    const updatedValue = "Hello World";

    cy.get("tbody")
      .first()
      .then(($tbody) => {
        cy.wrap($tbody).find("tr").should("have.length", expectedRowCount);

        updateItem($tbody, 0, 2, updatedValue);

        cy.get($tbody)
          .find("tr")
          .eq(0)
          .find("td")
          .eq(2)
          .find("div")
          .contains(updatedValue);
      });
  });

  function updateItem($tbody, rowIndex, columnIndex, newValue) {
    cy.get($tbody)
      .find("tr")
      .eq(rowIndex)
      .find("td")
      .eq(columnIndex)
      .find("div")
      .dblclick();

    cy.get($tbody)
      .find("tr")
      .eq(rowIndex)
      .find("td")
      .eq(columnIndex)
      .find("div")
      .find("input")
      .clear()
      .type(newValue);

    cy.get($tbody)
      .find("tr")
      .eq(rowIndex)
      .find("td")
      .eq(columnIndex + 1)
      .find("div")
      .find("div")
      .find("button")
      .click();
  }
});
