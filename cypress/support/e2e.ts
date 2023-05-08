import { GetTestMail } from "@gettestmail/typescript-sdk";

const testMail = new GetTestMail(Cypress.env("API_KEY"));

Cypress.Commands.add("createNewMailbox", () => {
  return cy.wrap(testMail.createNew());
});

Cypress.Commands.add("waitForMessage", (emailAddress: string) => {
  return cy.wrap(testMail.waitForMessage(emailAddress), {
    timeout: 5 * 60 * 1000,
  }); // 5 minutes
});
