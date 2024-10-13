import React from "react";
import HomePage from "./page";

describe("Home Page", () => {
  it("Checks for the main Title", () => {
    cy.viewport("macbook-16");
    cy.mount(<HomePage />);
    cy.wait(200);
    cy.get("[data-cy='hero-title']")
      .should("exist")
      .and("have.text", "Find Your Music Match");
  });

  it("Checks if the web screenshot is visible ", () => {
    cy.viewport("macbook-16");
    cy.mount(<HomePage />);
    cy.wait(200);
    cy.get("[data-cy='web-screenshot']").should("exist");
  });

  it("Checks for the first content section", () => {
    cy.viewport("macbook-16");
    cy.mount(<HomePage />);
    cy.wait(100);
    cy.get("[data-cy='content-title1']")
      .scrollIntoView()
      .should("exist")
      .and("be.visible")
      .and("have.text", "Your Perfect Harmony");

    cy.get("[data-cy='content-text1']")
      .should("exist")
      .and("be.visible")
      .and(
        "contain",
        "Where every chord strikes a connection. Discover love through the rhythm of music 🎶",
      );

    cy.get("[data-cy='content-image1']").should("exist").and("be.visible");
    cy.get("[data-cy='steps']").should("exist").and("be.visible");
    cy.get("[data-cy='features']").should("exist").and("be.visible");
  });

  it("Checks for the logo carousel", () => {
    cy.viewport("macbook-16");
    cy.mount(<HomePage />);

    cy.get("[data-cy='logo-carousel']")
      .scrollIntoView()
      .should("exist")
      .and("be.visible");
  });
});
