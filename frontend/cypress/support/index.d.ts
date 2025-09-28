/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-test attribute
         * @example cy.getBySel('login-button')
         */
        getBySel(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
        getBySelLike(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
    }
}
