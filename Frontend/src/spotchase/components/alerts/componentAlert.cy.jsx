import React from "react";
import Alert from "./Alert";

describe("Testing Alerts", () => {
  it("Testing Alerts with warning type, checks if it exists and has the right class", () => {
    cy.viewport("macbook-16");
    cy.mount(<Alert isTop={true} type={"warning"} message={"Cypress Test"} />);
    cy.get("[data-cy='alert']").should("have.class", "bg-yellow-50");
  });

  it("Testing Alerts with success type, checks if it exists and has the right class", () => {
    cy.viewport("macbook-16");
    cy.mount(<Alert isTop={true} type={"success"} message={"Cypress Test"} />);
    cy.get("[data-cy='alert']").should("have.class", "bg-green-50");
  });

  it("Testing Alerts with error type, checks if it exists and has the right class", () => {
    cy.viewport("macbook-16");
    cy.mount(<Alert isTop={true} type={"error"} message={"Cypress Test"} />);
    cy.get("[data-cy='alert']").should("have.class", "bg-red-50");
  });

  it("Testing Alerts without type, checks if it exists and has the right class", () => {
    cy.viewport("macbook-16");
    cy.mount(<Alert isTop={true} message={"Cypress Test"} />);
    cy.get("[data-cy='alert']").should("have.class", "bg-blue-50");
  });
});
