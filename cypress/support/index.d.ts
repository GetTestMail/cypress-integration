declare namespace Cypress {
  interface Chainable {
    createNewMailbox(): Chainable;
    waitForMessage(emailAddress: string): Chainable;
  }
}
