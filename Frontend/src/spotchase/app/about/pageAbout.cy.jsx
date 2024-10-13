import React from "react";
import About from "./page";

describe("About Section", () => {
  it("Checks if About section is visible", () => {
    cy.viewport("macbook-16");
    cy.mount(<About />);

    cy.get("[data-cy='main-title']").should(
      "exist",
      "be.visible",
      "have.text",
      "Our Story",
    );
    cy.get("[data-cy='about-image']").should("exist", "be.visible");
    cy.get("[data-cy='about-text1']").should(
      "exist",
      "be.visible",
      "have.text",
      "Welcome to SpotLove, the revolutionary dating app",
    );
    cy.get("[data-cy='about-text2']").should(
      "exist",
      "be.visible",
      "have.text",
      "SpotLove was born out of a passion for music",
    );
  });

  it("Checks FAQ is visible and can click through sections", () => {
    cy.viewport("macbook-16");
    cy.mount(<About />);
    cy.get("[data-cy='faq-title0']").click();
    cy.get("[data-cy='faq-text0']")
      .should("exist")
      .and("be.visible")
      .and(
        "contain",
        "Simply enter the app, sign in with your Spotify account, and let the musical journey to love begin!",
      );
    cy.get('[data-cy="faq-title0"]').click();
    cy.get('[data-cy="faq-text0"]').should("not.exist");

    cy.get("[data-cy='faq-title1']").click();
    cy.get("[data-cy='faq-text1']")
      .should("exist")
      .and("be.visible")
      .and(
        "contain",
        "SpotLove is accessible on all devices with a browser, ensuring you can connect with matches wherever you go.",
      );
    cy.get('[data-cy="faq-title1"]').click();
    cy.get('[data-cy="faq-text1"]').should("not.exist");

    cy.get("[data-cy='faq-title2']").click();
    cy.get("[data-cy='faq-text2']")
      .should("exist")
      .and("be.visible")
      .and(
        "contain",
        "The 'music match' badge appears on profiles of users who have recently listened to the same song as you, signaling a shared musical interest.",
      );
    cy.get('[data-cy="faq-title2"]').click();
    cy.get('[data-cy="faq-text2"]').should("not.exist");

    cy.get("[data-cy='faq-title3']").click();
    cy.get("[data-cy='faq-text3']")
      .should("exist")
      .and("be.visible")
      .and(
        "contain",
        "SpotLove is available to users aged 18 and above, ensuring a safe and inclusive environment for all music lovers.",
      );
    cy.get('[data-cy="faq-title3"]').click();
    cy.get('[data-cy="faq-text3"]').should("not.exist");
  });
});
