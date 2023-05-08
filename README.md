# cypress-integration
GetTestMail SDK integration with the Cypress E2E testing framework

This repository contains a sample project that shows how to integrate the GetTestMail typescript SDK with the Cypress E2E testing framework. 

The e2e test in `cypress/e2e` contains an example test that tests the [GetTestMail](https://gettestmail.com) registration form.

You need to change the test to match your own registration form. If you need help, you can reach out and we will help you.

The folder `cypress/support` contains the integration. Feel free to copy the code to your own project.

## Installation

```bash
npm install
```

To run the tests you need to add the GetTestMail API key in a `cypress.env.json` file:

```json
{
  "API_KEY": "Add your API key"
}
```

If you don't have an API key, you can get one by signing up at [GetTestMail](https://gettestmail.com/en/signup).

