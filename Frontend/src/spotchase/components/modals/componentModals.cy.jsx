import React from "react";
import ModalConfirm from "./ModalConfirm";
import ModalDefault from "./ModalDefault";
import ModalOnboarding from "./ModalOnboarding";
import ModalReport from "./ModalReport";

describe("Modal Confirm", () => {
  it("Checks if it displays when open is true", () => {
    const handleCancel = cy.stub().as("handleCancel");
    const handleConfirm = cy.stub().as("handleConfirm");
    const setOpen = cy.stub().as("setOpen");

    cy.viewport("macbook-16");
    cy.mount(
      <ModalConfirm
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        open={true}
        setOpen={setOpen}
      />,
    );
    cy.get("[data-cy='modal-confirm']").should("exist").should("be.visible");
  });

  it("Checks buttons", () => {
    const setOpen = cy.stub().as("setIsOpen");
    const handleCancel = cy.stub().as("handleCancel");
    const handleConfirm = cy.stub().as("handleConfirm");
    cy.viewport("macbook-16");
    cy.mount(
      <ModalConfirm
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        open={true}
        setOpen={setOpen}
      />,
    );
    cy.get("[data-cy='cancel-button']")
      .should("exist")
      .should("be.visible")
      .click();
    cy.get("@handleCancel").should("have.been.called");
    cy.get("[data-cy='confirm-button']")
      .should("exist")
      .should("be.visible")
      .click();
    cy.get("@handleConfirm").should("have.been.called");
  });
});

describe("Modal Default", () => {
  it("Checks if it displays when open is true", () => {
    const setOpen = cy.stub().as("setIsOpen");
    cy.mount(<ModalDefault open={true} setOpen={setOpen} />);
    cy.get("[data-cy='modal-default']").should("exist").should("be.visible");
  });
});

describe("Modal Onboarding", () => {
  it("Renders the modal when isOpen is true", () => {
    cy.viewport("macbook-16");
    const handleProfileUpdate = cy.stub().as("updateProfile");
    const setIsOpen = cy.stub().as("setIsOpen");
    const setAlert = cy.stub().as("setAlert");

    cy.mount(
      <ModalOnboarding
        isOpen={true}
        setIsOpen={setIsOpen}
        handleProfileUpdate={handleProfileUpdate}
        name="Jeffrey"
        img="path/to/image.jpg"
        setAlert={setAlert}
      />,
    );

    cy.get('[data-cy="modal-onboarding"]').should("be.visible");
  });

  it("Validates the user name and displays an error for invalid input", () => {
    cy.viewport("macbook-16");
    const setAlert = cy.stub().as("setAlert");

    cy.mount(
      <ModalOnboarding
        isOpen={true}
        setIsOpen={() => {}}
        handleProfileUpdate={() => {}}
        name="123"
        img=""
        setAlert={setAlert}
      />,
    );

    cy.get('input[name="username"]').type("apot123{enter}");
    cy.get("@setAlert").should("have.been.calledWith", {
      type: "warning",
      message: "Please add your first name",
      active: true,
    });
  });

  it("Handles file uploads correctly", () => {
    const setAlert = cy.stub().as("setAlert");
    cy.viewport("macbook-16");
    cy.mount(
      <ModalOnboarding
        isOpen={true}
        setIsOpen={() => {}}
        handleProfileUpdate={() => {}}
        name="Joseph"
        img=""
        setAlert={setAlert}
      />,
    );

    const fileName = "public/SpotLoveSubmark.png";
    cy.get('input[type="file"]').selectFile(fileName, { force: true });
    cy.get('img[src*="blob"]').should("be.visible"); // Checking if image preview is shown
  });
});

describe("Modal Report", () => {
  it("Checks if it displays when open is true", () => {
    const setAlert = cy.stub().as("setAlert");
    const setUserFetching = cy.stub().as("setUserFetching");
    const setIsOpen = cy.stub().as("setIsOpen");

    cy.viewport("macbook-16");
    cy.mount(
      <ModalReport
        isOpen={true}
        setIsOpen={setIsOpen}
        setAlert={setAlert}
        targetUser="targetUser"
        id="id"
        setUserFetching={setUserFetching}
      />,
    );
    cy.get("[data-cy='modal-report']").should("exist").should("be.visible");
  });
});
