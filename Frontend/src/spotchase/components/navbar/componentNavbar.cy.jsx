import React from "react";
import Navbar from "./Navbar"; // Adjust the path according to your project structure

describe("Navbar Component", () => {
  it("displays the white logo and text on the Home page", () => {
    cy.mount(<Navbar page="Home" />);
    cy.get("img").should("have.attr", "src", "/SpotLoveLogo_White.png");
    cy.get("a").contains("About").should("have.class", "text-white");
    cy.get("a").contains("Contact").should("have.class", "text-white");
    cy.get("[data-cy='login-button']").contains("Log in");
  });

  it("displays the pink logo and gradient text on other pages", () => {
    cy.mount(<Navbar page="About" />);
    cy.get("img").should("have.attr", "src", "/SpotLoveLogo.png");
    cy.get("a")
      .contains("About")
      .should("have.class", "bg-gradient-to-r from-peach to-peach-dark"); // Validate gradient background
    cy.get("a")
      .contains("Contact")
      .should("have.class", "bg-gradient-to-r from-peach to-peach-dark");
    cy.get("div").contains("Log in");
  });
});
