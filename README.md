# SauceDemo Web Test Automation

End-to-end web test automation project for the [SauceDemo](https://www.saucedemo.com/) e-commerce application using Playwright and TypeScript.

This repository is the automation continuation of the manual testing project:

* [qa-ecommerce-manual-testing](https://github.com/ldmrtnll-arch/qa-ecommerce-manual-testing)

The automated scenarios are based on the test cases documented in the manual testing repository, preserving their original test case IDs for traceability.

## Project Objective

The objective of this project is to demonstrate practical web test automation skills through realistic e-commerce scenarios.

The project currently covers login, product inventory, shopping cart, checkout customer information, checkout overview, and purchase completion. It will be expanded incrementally to include navigation, authentication state, cart reset, receipt validation, reusable fixtures, test evidence, and continuous integration.

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

### Shopping Cart

| Test Case | Scenario |
|---|---|
| TC-CAR-001 | Add one product from the inventory page |
| TC-CAR-002 | Add two different products to the cart |
| TC-CAR-003 | Add a product from the product details page |
| TC-CAR-004 | Remove a product through the inventory page |
| TC-CAR-005 | Remove a product from the cart page |
| TC-CAR-006 | Continue shopping without losing cart items |
| TC-CAR-007 | Validate product data consistency between inventory and cart |
| TC-CAR-008 | Prevent the same product from being added twice |

The shopping cart tests validate:

- cart badge updates after adding and removing products;
- addition of products from the inventory and product details pages;
- persistence of cart items while navigating between pages;
- selective removal without affecting other products;
- consistency of product name, description, price, and quantity;
- prevention of duplicate product entries;
- cart content and item quantity after user actions.

### Checkout Information

| Test Case | Scenario |
|---|---|
| TC-CHK1-001 | Continue checkout with valid customer information |
| TC-CHK1-002 | Require the first name field |
| TC-CHK1-003 | Require the last name field |
| TC-CHK1-004 | Require the postal code field |
| TC-CHK1-005 | Prevent checkout when all fields are empty |
| TC-CHK1-006 | Cancel checkout information and return to the cart |
| TC-CHK1-007 | Reject fields containing only spaces |
| TC-CHK1-008 | Reject an invalid postal code |

The checkout information tests validate:

- navigation from the cart to the checkout information page;
- successful continuation with valid customer data;
- required field validation;
- preservation of valid values after validation errors;
- cancellation and return to the cart without losing its state;
- persistence of the selected product during checkout;
- validation of whitespace-only customer information;
- validation of invalid postal code characters.

### Checkout Overview and Completion

| Test Case | Scenario |
|---|---|
| TC-CHK2-001 | Display the selected product in the checkout overview |
| TC-CHK2-002 | Calculate the item subtotal correctly |
| TC-CHK2-003 | Calculate the order total correctly |
| TC-CHK2-004 | Cancel checkout overview and return to the inventory |
| TC-CHK2-005 | Finish a valid purchase successfully |
| TC-CHK2-006 | Clear the cart after completing the purchase |

The checkout overview and completion tests validate:

- consistency of product name, description, price, and quantity between the cart and checkout overview;
- dynamic item subtotal calculation based on price and quantity;
- monetary formatting for subtotal, tax, and total;
- calculation of the order total from subtotal and tax;
- checkout cancellation without losing the cart state;
- successful purchase completion and confirmation messages;
- removal of the cart badge after purchase;
- complete cart cleanup after purchase completion.

### Known Checkout Defects

| Test Case | Observed Behavior | Classification |
|---|---|---|
| TC-CHK1-007 | SauceDemo accepts checkout fields containing only whitespace | Known defect |
| TC-CHK1-008 | SauceDemo accepts non-numeric and special characters as a postal code | Known limitation |

These scenarios remain active using Playwright's `test.fail()` annotation. This allows the suite to continue monitoring the defects and report an unexpected pass when the application behavior changes.

## Cross-Browser Testing

The test suite is configured to run on:

- Chromium
- Firefox
- WebKit

Latest verified local execution:

```text
105 passed (35.5s)
```

This result represents thirty-five automated scenarios executed across three browser engines:

- 7 login scenarios;
- 6 product inventory scenarios;
- 8 shopping cart scenarios;
- 8 checkout information scenarios;
- 6 checkout overview and completion scenarios;
- Chromium, Firefox, and WebKit.

Of the 105 executions:

- 99 regular executions passed;
- 6 expected failures confirmed the two known checkout defects across the three browsers;
- no unexpected failures were found.

## Project Structure

```text
qa-ecommerce-playwright/
├── pages/
│   ├── cart-page.ts
│   ├── checkout-complete-page.ts
│   ├── checkout-information-page.ts
│   ├── checkout-overview-page.ts
│   ├── inventory-page.ts
│   ├── login-page.ts
│   └── product-details-page.ts
├── test-data/
│   ├── checkout-data.ts
│   ├── inventory-data.ts
│   └── login-data.ts
├── tests/
│   ├── cart/
│   │   └── cart.spec.ts
│   ├── checkout/
│   │   ├── checkout-information.spec.ts
│   │   └── checkout-overview.spec.ts
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
* traceability through test case IDs;
* monitoring of known defects with `test.fail()` annotations;
* Page Object Model where reuse provides value;
* assertions for navigation, messages, and page content;
* screenshots and videos retained on failure;
* Playwright HTML reports;
* trace collection on test retry.

## Project Status

### Completed

- Playwright and TypeScript setup
- Cross-browser configuration
- Login test scenarios
- Reusable login test data
- Login Page Object
- Product catalog test scenarios
- Product detail consistency validation
- Alphabetical product sorting tests
- Numeric price sorting tests
- Inventory and product details Page Objects
- Shopping cart test scenarios
- Product addition from inventory and details pages
- Selective product removal tests
- Cart state persistence validation
- Product data consistency validation
- Duplicate product prevention
- Cart Page Object
- Checkout information test scenarios
- Required customer information validation
- Checkout cancellation and cart persistence validation
- Checkout Information Page Object
- Reusable checkout test data
- Known checkout defect monitoring
- Checkout overview and completion test scenarios
- Dynamic product data comparison between cart and checkout
- Item subtotal validation
- Tax and order total validation
- Checkout overview cancellation validation
- Successful purchase completion validation
- Cart cleanup validation after purchase
- Checkout Overview Page Object
- Checkout Complete Page Object
- Local HTML reporting
- Initial Git and GitHub setup
- Full regression execution with 105 successful outcomes, including 6 expected failures

### In Progress

- Checkout confirmation navigation test planning

### Planned

- Checkout confirmation navigation automation
- Menu and general navigation tests
- Logout and authenticated-session validation
- Cart reset tests
- Empty-cart checkout validation
- Receipt PDF validation
- Reusable fixtures
- GitHub Actions pipeline
- Test execution evidence
- Traceability documentation
- Final project review

## Author

**Lidia Martinelli**

Quality Assurance portfolio project focused on manual and automated software testing.
