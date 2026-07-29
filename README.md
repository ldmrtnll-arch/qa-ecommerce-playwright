# SauceDemo Web Test Automation

End-to-end web test automation project for the [SauceDemo](https://www.saucedemo.com/) e-commerce application using Playwright and TypeScript.

This repository is the automation continuation of the manual testing project:

* [qa-ecommerce-manual-testing](https://github.com/ldmrtnll-arch/qa-ecommerce-manual-testing)

The automated scenarios are based on the test cases documented in the manual testing repository, preserving their original test case IDs for traceability.

## Project Objective

The objective of this project is to demonstrate practical web test automation skills through realistic e-commerce scenarios.

The project currently covers login and product inventory functionality and will be expanded incrementally to include shopping cart, checkout, navigation, reusable fixtures, test evidence, and continuous integration.

## Application Under Test

**Application:** SauceDemo
**URL:** https://www.saucedemo.com/

SauceDemo is a sample e-commerce application commonly used for software testing practice.

## Technologies

* Playwright
* TypeScript
* Node.js
* npm
* Git
* GitHub

## Test Coverage

### Login

| Test Case  | Scenario                          |
| ---------- | --------------------------------- |
| TC-LOG-001 | Login with valid credentials      |
| TC-LOG-002 | Login with an invalid username    |
| TC-LOG-003 | Login with an invalid password    |
| TC-LOG-004 | Login without entering a username |
| TC-LOG-005 | Login without entering a password |
| TC-LOG-006 | Login with both fields empty      |
| TC-LOG-007 | Login with a locked-out user      |

The tests validate:

* successful authentication;
* access restriction for invalid credentials;
* required field messages;
* locked-out account behavior;
* navigation to the product inventory;
* visibility of the product list after login.

### Product Inventory

| Test Case | Scenario |
|---|---|
| TC-INV-001 | Display the complete product catalog |
| TC-INV-002 | Validate consistency between catalog and product details |
| TC-INV-003 | Sort products by name from A to Z |
| TC-INV-004 | Sort products by name from Z to A |
| TC-INV-005 | Sort products by price from low to high |
| TC-INV-006 | Sort products by price from high to low |

The inventory tests validate:

- catalog title and product list visibility;
- the presence of six products;
- product name, description, price, image, and action button;
- consistency between catalog and product detail information;
- alphabetical sorting in ascending and descending order;
- numeric price sorting in ascending and descending order;
- visibility of the menu, shopping cart, and sorting controls.

## Cross-Browser Testing

The test suite is configured to run on:

- Chromium
- Firefox
- WebKit

Latest verified local execution:

```text
39 passed
```

This result represents thirteen automated scenarios executed across three browser engines:

- 7 login scenarios;
- 6 product inventory scenarios;
- Chromium, Firefox, and WebKit.

## Project Structure

```text
qa-ecommerce-playwright/
├── pages/
│   ├── inventory-page.ts
│   ├── login-page.ts
│   └── product-details-page.ts
├── test-data/
│   ├── inventory-data.ts
│   └── login-data.ts
├── tests/
│   ├── inventory/
│   │   └── inventory.spec.ts
│   └── login/
│       └── login.spec.ts
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

## Prerequisites

Before running the project, install:

* Node.js
* npm
* Git

## Installation

Clone the repository:

```bash
git clone https://github.com/ldmrtnll-arch/qa-ecommerce-playwright.git
```

Access the project directory:

```bash
cd qa-ecommerce-playwright
```

Install the dependencies:

```bash
npm install
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Running the Tests

Run the complete cross-browser test suite:

```bash
npm test
```

Run only on Chromium:

```bash
npm run test:chromium
```

Run tests with the browser visible:

```bash
npm run test:headed
```

Open Playwright UI Mode:

```bash
npm run test:ui
```

Open the latest HTML report:

```bash
npm run report
```

## Current Automation Practices

The project currently applies:

* independent test scenarios;
* parallel test execution;
* cross-browser testing;
* reusable test data;
* Page Object Model where reuse provides value;
* assertions for navigation, messages, and page content;
* screenshots and videos retained on failure;
* Playwright HTML reports;
* trace collection on test retry.

## Project Status

### Completed

* Playwright and TypeScript setup
* Cross-browser configuration
* Login test scenarios
* Reusable login test data
* Login Page Object
* Local HTML reporting
* Initial Git and GitHub setup
- Product catalog test scenarios
- Product detail consistency validation
- Alphabetical product sorting tests
- Numeric price sorting tests
- Inventory and product details Page Objects
- Full regression execution with 39 passing tests

### In Progress

- Shopping cart test planning

### Planned

- Shopping cart tests
- Checkout tests
- Navigation tests
- Reusable fixtures
- GitHub Actions pipeline
- Test execution evidence
- Traceability documentation
- Final project review

## Author

**Lidia Martinelli**

Quality Assurance portfolio project focused on manual and automated software testing.
