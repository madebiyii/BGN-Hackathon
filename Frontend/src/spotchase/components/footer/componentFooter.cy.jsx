import React from "react";
import Footer from "./Footer";

describe("Footer Section", () => {
  it("Checks if footer exists and is visible", () => {
    cy.viewport("macbook-16");
    cy.mount(<Footer />);
    cy.get("footer")
      .should("exist")
      .should("have.class", "m-4 rounded-lg bg-white");

    cy.get("[data-cy='footer-logo']")
      .should("exist")
      .should("have.attr", "src", "/SpotLoveLogo.png");
  });
});
