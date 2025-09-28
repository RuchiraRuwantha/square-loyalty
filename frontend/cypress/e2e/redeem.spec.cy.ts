describe("Redeem Points Feature", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.getBySel("phone-input").type("+14155551234");
        cy.getBySel("login-button").click();

        cy.url({ timeout: 10000 }).should("include", "/dashboard");
    });

    it("should display redeem form options", () => {
        cy.getBySel("redeem-input").should("be.visible");
        cy.getBySel("redeem-button").should("be.visible");
    });

    it("should allow redeeming points by entering number", () => {
        cy.wait(500);
        cy.getBySel("balance-value").invoke("text").then((initialBalanceText) => {
            const initialBalance = parseInt(initialBalanceText.split(" ")[0]);

            cy.getBySel("redeem-input").type("5");
            cy.getBySel("redeem-button").click();

            cy.wait(500);

            cy.getBySel("balance-value")
                .invoke("text")
                .then((newBalanceText) => {
                    const newBalance = parseInt(newBalanceText.split(" ")[0]);
                    expect(newBalance).to.be.lessThan(initialBalance);
                });

            cy.getBySel("activity-row").last().within(() => {
                cy.contains("Redeemed");
                cy.contains("-5");
            });
        });
    });

    it("should show error if trying to redeem more points than available", () => {
        cy.intercept("POST", "/api/accounts/*/redeem", {
            statusCode: 400,
            body: { message: "Not enough points" },
        }).as("redeemRequest");

        cy.getBySel("redeem-input").type("9999");
        cy.getBySel("redeem-button").click();

        cy.wait("@redeemRequest");

        cy.getBySel("input-error-message").should("be.visible").and("contain", "Not enough points");
    });
});
