describe("Search", () => {
  it("shows a list of results based on a search term", () => {
    cy.visit("http://localhost:8080/");

    cy.contains("iTunes Search App");
    cy.contains('Type a search term to see some results');

    // Returns first 10 results
    cy.get('input[type="text"').type("Spice Girls");
    cy.get("button").click();
    cy.get("li").should("have.length", 10);

    // Loads 10 more results after scrolling to the bottom
    cy.get('[data-testid="scroll-container"').scrollTo("bottom");
    cy.get("li").should("have.length", 20);

    // New search after clicking checkbox
    cy.contains("Songs").click();
    cy.get("li").should("have.length", 10);

    // Only 1 result when filtering by artist
    cy.contains("Albums").click();
    cy.get("li").should("have.length", 1);

    // Shows no results message 
    cy.get('input[type="text"').clear();
    cy.get('input[type="text"').type("%%%");
    cy.get("button").click();
    cy.contains('No results for the term "%%%');
  });
});
