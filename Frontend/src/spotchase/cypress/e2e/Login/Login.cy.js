describe("Testing Email Sign Up", () => {
    beforeEach(() => {
        cy.clearAllLocalStorage();
        cy.clearAllCookies();
        cy.clearAllSessionStorage();
        cy.visit('http://localhost:3000/');

    });

    it("Pressing the login button and trying to sign in and invalid email  ", () => {
        cy.log("Visiting the homepage");
        cy.wait(5000);
        cy.get("[data-cy='login-button']").should("exist").click();
        cy.wait(1000);
        cy.get("[data-cy='login-button-loginpage']").should("exist").click();
        cy.get('input[name="email"]').type("Jeff");
        cy.get("[data-cy='send-email-button']").click();
        cy.get("[data-cy='alert']").should("have.class", "bg-red-50");

    });

    it("Pressing the login button and trying to sign in and email is empty", () => {
        cy.log("Visiting the homepage");
        cy.wait(5000);
        cy.get("[data-cy='login-button']").should("exist").click();
        cy.wait(1000);
        cy.get("[data-cy='login-button-loginpage']").should("exist").click();
        cy.get('input[name="email"]').type("{enter}");
        cy.get("[data-cy='send-email-button']").click();
        cy.get("[data-cy='alert']").should("have.class", "bg-red-50");

    });

    it.skip("Pressing the login button and trying to sign in and email is valid", () => {
        cy.log("Visiting the homepage");
        cy.wait(5000);
        cy.get("[data-cy='login-button']").should("exist").click();
        cy.wait(1000);
        cy.get("[data-cy='login-button-loginpage']").should("exist").click();
        cy.get('input[name="email"]').type("test@spotlove.com");
        cy.get("[data-cy='send-email-button']").click();
        cy.wait(2000);
        cy.get("[data-cy='alert']").should("have.class", "bg-green-50");
    });

});

describe.skip("Testing Login", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');

    });
    it("Entering the wrong password", () => {
        cy.get("[data-cy='login-button']").should("exist").click();
        cy.get("[data-cy='login-button-loginpage']").should("exist").click();
        cy.get("[data-cy='password-open-button']").click();
        cy.get('input[name="password"]').should("exist").type("wrong password", { log: true });
        cy.wait(2000);
        cy.get("[data-cy='button-continue-login']").click();
        cy.get("[data-cy='alert']").should("have.class", "bg-red-50");
    });
    it.skip("Entering the password and logging in", () => {
        cy.session('userSession', login);
        cy.visit('http://localhost:3000/feed');
        cy.url().should("include", "/feed");
    });

});

const login = () => {
    cy.visit('http://localhost:3000/');
    const password = Cypress.env('NEXT_PUBLIC_SPOTLOVE_PASSWORD');
    cy.get("[data-cy='login-button']").should("exist").click();
    cy.get("[data-cy='login-button-loginpage']").should("exist").click();
    cy.get("[data-cy='password-open-button']").click();
    cy.get('input[name="password"]').should("exist").type(password, { log: true });
    cy.get("[data-cy='button-continue-login']").click();
    cy.origin('https://accounts.spotify.com', () => {
        const loginPassword = Cypress.env('NEXT_PUBLIC_CYPRESS_LOGIN_PASSWORD');
        const loginEmail = Cypress.env('NEXT_PUBLIC_CYPRESS_LOGIN_EMAIL');
        cy.get("[id='login-username']").should("exist").type(loginEmail);
        cy.get("[id='login-password']").should("exist").type(loginPassword);
        cy.get("[id='login-button']").should("exist").click();
    });
    cy.wait(2000);
    cy.visit('http://localhost:3000/');
    cy.get("[data-cy='login-button']").should("exist").click();
    cy.get("[data-cy='login-button-loginpage']").should("exist").click();
    cy.get("[data-cy='password-open-button']").click();
    cy.get('input[name="password"]').should("exist").type(password, { log: true });
    cy.get("[data-cy='button-continue-login']").click();
    cy.intercept('GET', '/api/auth').as('getMe');
};

