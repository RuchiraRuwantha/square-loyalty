describe("Earn Points Feature", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getBySel("phone-input").type("+14155551234");
    cy.getBySel("login-button").click();

    cy.url().should("include", "/dashboard");
  });

  it("should display earn points form", () => {
    cy.getBySel("order-id-input").should("be.visible");
    cy.getBySel("earn-button").should("be.visible");
  });

  it("should allow earn points with valid order Id", () => {
    // Capture initial balance
    cy.getBySel("balance-value").invoke("text").then((initialBalanceText) => {
      const initialBalance = parseInt(initialBalanceText.split(" ")[0]);

      // Enter order ID and submit
      cy.getBySel("order-id-input").type("ord-1234");
      cy.getBySel("earn-button").should("not.be.disabled").click();

      // Wait for API mock response (alias it in intercept if using real API)
      cy.wait(500);

      // Balance should increase
      cy.getBySel("balance-value")
        .invoke("text")
        .then((newBalanceText) => {
          const newBalance = parseInt(newBalanceText.split(" ")[0]);
          expect(newBalance).to.be.greaterThan(initialBalance);
        });

      // Activity table should show new EARN entry
      cy.getBySel("activity-row").last().within(() => {
        cy.contains("Earned");
        cy.contains("ord-1234");
        cy.contains("+10");
      });
    });
  });

  it("should show error if order_id is missing", () => {
    cy.getBySel("earn-button").click();
    cy.getBySel("input-error-message").should("be.visible").and("contain", "Please enter a valid Order ID");
  });

  it("should handle API error gracefully", () => {
    // Stub API to return error (example if backend route is /api/accounts/:id/earn)
    cy.intercept("POST", "/api/accounts/*/earn", {
      statusCode: 400,
      body: { message: "Invalid order ID" },
    }).as("earnRequest");

    cy.getBySel("order-id-input").type("bad-id");
    cy.getBySel("earn-button").click();

    cy.wait("@earnRequest");

    cy.getBySel("input-error-message").should("be.visible").and("contain", "Invalid order ID");
  });
});