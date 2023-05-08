import { Mailbox } from "@gettestmail/typescript-sdk";

describe("User Registration Form", () => {
  before(() => {
    cy.visit("https://gettestmail.com/en/signup");
  });

  context("Registration process", () => {
    let mailbox: Mailbox;

    before(() => {
      cy.createNewMailbox().then((createdMailbox) => {
        cy.log(`Created mailbox: ${createdMailbox.emailAddress}`);
        mailbox = createdMailbox;
        cy.wrap(mailbox).as("mailbox"); // if you prefer to use the `this` keyword
      });
    });

    it("Fills and submits the registration from", () => {
      cy.get("#name").type("John Doe").should("have.value", "John Doe");
      cy.get("#email")
        .type(mailbox.emailAddress)
        .should("have.value", mailbox.emailAddress);
      cy.get("#password").type("myp@ssw0rd").should("have.value", "myp@ssw0rd");
      cy.get("#referralSource").select("Google").should("have.value", "Google");
      cy.get("#allow").check().should("be.checked");

      // submit
      cy.get('button[type="submit"]').click();

      // assert
      cy.get('[data-testid="snackbar"]')
        .should("be.visible")
        .and("have.class", "border-blue-500")
        .and("have.class", "bg-blue-100")
        .and("have.class", "text-blue-700");
    });

    context("Verify email", () => {
      let verificationLink: string;

      before((done) => {
        cy.waitForMessage(mailbox.emailAddress).then((mailbox: Mailbox) => {
          if (!mailbox.message) {
            return done(new Error("No message received"));
          }

          // Extract the verification link using a regex pattern
          const verificationLinkRegex =
            /https?:\/\/gettestmail\.com\/verify\?token=[^"]+/i;
          const matchResult = mailbox.message.html.match(verificationLinkRegex);
          if (matchResult === null) {
            return done(new Error("Verification link not found in the email"));
          }
          verificationLink = matchResult[0];
          done();
        });
      });

      it("Visits the verification link and asserts that the verification is successful", () => {
        cy.visit(verificationLink);

        // assert that the verification is successful
        cy.get('[data-testid="snackbar"]')
          .should("be.visible")
          .and("have.class", "border-blue-500")
          .and("have.class", "bg-blue-100")
          .and("have.class", "text-blue-700");
      });
    });
  });
});
