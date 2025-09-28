describe("Logout Feature", () => {
    beforeEach(() => {
        // Stub login first
        cy.intercept("POST", "/api/login", {
            statusCode: 200,
            body: {
                account_id: "acc-123",
                phone_number: "+14155551234",
                balance: 50,
            },
        }).as("loginRequest");

        cy.visit("/");

        cy.getBySel("phone-input").type("+14155551234");
        cy.getBySel("login-button").click();

        cy.wait("@loginRequest");

        // Ensure dashboard loaded
        cy.url({ timeout: 10000 }).should("include", "/dashboard");
    });

    it("should logout and redirect to login page", () => {
        cy.getBySel("logout-button").click();

        // Should be redirected to login
        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
        cy.getBySel("phone-input").should("be.visible");

        // account_id should be cleared
        cy.window().then((win) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(win.localStorage.getItem("account_id")).to.be.null;
        });
    });

    it("should prevent access to dashboard after logout", () => {
        cy.getBySel("logout-button").click();

        cy.visit("/dashboard");
        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
        cy.getBySel("phone-input").should("be.visible");
    });
});
