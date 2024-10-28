describe("Testing app", () => {
  beforeEach(() => {
    cy.visit("https://app.100xdevs.com");
  });

  it("is able to log in", () => {
    cy.contains("Login").should("exist");
    cy.contains("Login").click();
    cy.contains("Welcome to 100xDevs").should("exist", { timeout: 10000 });
    cy.get("#email").type("abrarrr2110@gmail.com");

    // Fill in the password field
    cy.get("#password").type("123random");

    cy.get("button").eq(4).click();

    cy.contains("View Content").should("exist", { timeout: 10000 });
  });
});
