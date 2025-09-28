describe("Login Feature", () => {

  beforeEach(() => {
    cy.get("body").then(($body) => {
      if ($body.find("[data-test=logout-button]").length) {
        cy.getBySel("logout-button").click();
      }
    });
    cy.visit('/');
  });

  it("should show login form", () => {
    cy.getBySel("phone-input").should("be.visible");
    cy.getBySel("login-button").should("be.visible");
  });

  it("should login successfully with valid phone", () => {
    // Stub backend login API
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: {
        account_id: "acc-123",
        phone_number: "+14155551234",
        balance: 50,
      },
    }).as("loginRequest");

    cy.intercept("GET", "/api/accounts/*", {
      statusCode: 200,
      body: {
        id: 'acc-123',
        phone_number: '+14155551234',
        balance: 50,
        program_id: 'program-1',
      },
    }).as("balanceRequest");

    cy.getBySel("phone-input").type("+14155551234");
    cy.getBySel("login-button").click();

    cy.wait("@loginRequest");
    // Redirected to dashboard
    cy.url().should("include", "/dashboard");

    cy.wait("@balanceRequest");
    // Balance should be visible
    cy.getBySel("balance-value").should("contain", "50");
  });

  it("should show error for invalid phone format", () => {
    cy.getBySel("phone-input").type("12345");
    cy.getBySel("login-button").click();

    cy.getBySel("input-error-message")
      .should("be.visible")
      .and("contain", "Please enter a valid phone number in E.164 format (e.g. +14155551234).");
  });
});
