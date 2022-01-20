describe("Database Tester", () => {
  it("Should use the demo to test database search, routing, and metadata", () => {
    cy.visit("/");

    // Test search input
    cy.get("#testing-display-tabList")
      .find("button")
      .contains("Search")
      .click();
    cy.get("#testing-db-input").focus().type("Definitions");
    cy.get("#testing-db-item").find("h2").contains("Definitions").click();
    cy.url().should("include", "/guides/definitions");

    // Test in-page metadata
    cy.get("h2").contains("Definitions");
    cy.get("p").contains("unfamiliar terms");

    // Test in-page buttons where metadata forms the href
    // cy.get("#testing-db-repositoryLinkButton")
    //   .contains("Edit")
    //   .should("have.attr", "href")
    //   .and("include", "github.com");

    // Test remote metadata
    cy.get("button").contains("Back").click();
    cy.url().should("include", "/");
    cy.get("#testing-db-guides").find("h2").contains("Definitions");
    cy.get("#testing-db-guides").find("p").contains("Learn basic lexicon");
    cy.get("#testing-db-guides").find("h2").contains("Definitions").click();
    cy.url().should("include", "/guides/definitions");
  });
});
