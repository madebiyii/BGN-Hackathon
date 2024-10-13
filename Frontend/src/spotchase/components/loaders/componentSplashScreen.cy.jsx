import React from "react";
import Splash from "./SplashScreen";

describe("Splash Screen", () => {
  it("Checks if splash screen exists", () => {
    const test = () => {};
    cy.viewport("macbook-16");
    cy.mount(<Splash setSplash={test} />);
    cy.get("[data-cy='splash']").should("exist");
  });
});
