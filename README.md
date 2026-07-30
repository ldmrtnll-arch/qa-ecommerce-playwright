# SauceDemo Web Test Automation

End-to-end web test automation project for the [SauceDemo](https://www.saucedemo.com/) e-commerce application using Playwright and TypeScript.

This repository is the automation continuation of the manual testing project:

- [qa-ecommerce-manual-testing](https://github.com/ldmrtnll-arch/qa-ecommerce-manual-testing)

The automated scenarios are based on the test cases documented in the manual testing repository, preserving their original test case IDs for traceability.

## Project Objective

The objective of this project is to demonstrate practical web test automation skills through realistic e-commerce scenarios.

The project currently covers:

- login and access control;
- product inventory;
- product details;
- product sorting;
- shopping cart;
- checkout customer information;
- checkout overview;
- purchase completion;
- confirmation page navigation;
- side menu navigation;
- logout and authenticated-session validation;
- Reset App State behavior;
- empty-cart checkout validation;
- known application issue monitoring;
- cross-browser testing.

The suite is being developed incrementally, prioritizing meaningful validations, reusable components, independent scenarios and transparent handling of known application issues.

## Application Under Test

**Application:** SauceDemo
**URL:** https://www.saucedemo.com/

SauceDemo is a sample e-commerce application commonly used for software testing practice.

## Technologies

- Playwright
- TypeScript
- Node.js
- npm
- Git
- GitHub

## Test Coverage

### Login

| Test Case | Scenario |
|---|---|
| TC-LOG-001 | Login with valid credentials |
| TC-LOG-002 | Login with an invalid username |
| TC-LOG-003 | Login with an invalid password |
| TC-LOG-004 | Login without entering a username |
| TC-LOG-005 | Login without entering a password |
| TC-LOG-006 | Login with both fields empty |
| TC-LOG-007 | Login with a locked-out user |

The login tests validate:

- successful authentication;
- access restriction for invalid credentials;
- required field messages;
- locked-out account behavior;
- navigation to the product inventory;
- visibility of the product list after login.

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
- product name, description, price, image and action button;
- consistency between catalog and product detail information;
- alphabetical sorting in ascending and descending order;
- numeric price sorting in ascending and descending order;
- visibility of menu, shopping cart and sorting controls.

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
| TC-CAR-009 | Prevent checkout with an empty cart |

The shopping cart tests validate:

- cart badge updates after adding and removing products;
- addition of products from inventory and product details;
- persistence of cart items while navigating between pages;
- selective removal without affecting other products;
- consistency of product name, description, price and quantity;
- prevention of duplicate product entries;
- cart content after user actions;
- expected restriction of checkout when the cart is empty.

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
- behavior with non-numeric and special characters in the postal code.

### Checkout Overview and Completion

| Test Case | Scenario |
|---|---|
| TC-CHK2-001 | Display the selected product in the checkout overview |
| TC-CHK2-002 | Calculate the item subtotal correctly |
| TC-CHK2-003 | Calculate the order total correctly |
| TC-CHK2-004 | Cancel checkout overview and return to the inventory |
| TC-CHK2-005 | Finish a valid purchase successfully |
| TC-CHK2-006 | Clear the cart after completing the purchase |
| TC-CNF-002 | Return to the inventory from the checkout confirmation page |

The checkout overview and completion tests validate:

- consistency of product name, description, price and quantity between the cart and checkout overview;
- dynamic item subtotal calculation based on price and quantity;
- monetary formatting for subtotal, tax and total;
- calculation of the order total from subtotal and tax;
- checkout cancellation without losing the cart state;
- successful purchase completion;
- confirmation header and message;
- removal of the cart badge after purchase;
- complete cart cleanup after purchase completion;
- navigation from the confirmation page back to the product inventory.

### Side Menu Navigation

| Test Case | Scenario |
|---|---|
| TC-MEN-001 | Return to the inventory using All Items |
| TC-MEN-002 | Open the About page |
| TC-MEN-003 | Close the side menu |

The side menu tests validate:

- navigation from product details to the inventory;
- availability of menu options;
- navigation to the About destination;
- opening and closing behavior;
- preservation of the authenticated inventory page after closing the menu.

### Authentication Session

| Test Case | Scenario |
|---|---|
| TC-AUT-001 | Log out and prevent restoration of the authenticated session |

The logout test validates:

- availability of the logout option;
- redirection to the login page;
- clearing of authentication fields;
- prevention of authenticated content restoration through browser history.

### Reset App State

| Test Case | Scenario |
|---|---|
| TC-RST-001 | Clear the cart using Reset App State |
| TC-RST-002 | Keep the cart empty after reloading the inventory page |

The Reset App State tests validate:

- removal of products from the cart;
- removal of the cart badge;
- persistence of the empty cart after page reload;
- restoration of product action buttons;
- cart consistency after the reset operation.

## Monitored Expected Failures

Known application behaviors remain active in the suite using Playwright's `test.fail()` annotation.

| Test Case | Observed Behavior | Classification | Browser Executions |
|---|---|---|---|
| TC-CAR-009 | SauceDemo allows checkout to continue with an empty cart | Known defect | Chromium, Firefox and WebKit — 3 executions |
| TC-CHK1-007 | SauceDemo accepts required fields containing only whitespace | Known defect | Chromium, Firefox and WebKit — 3 executions |
| TC-CHK1-008 | SauceDemo accepts non-numeric values and special characters as a postal code | Behavior under investigation | Chromium, Firefox and WebKit — 3 executions |
| TC-RST-001 | Reset App State clears the cart but does not immediately update product buttons from **Remove** to **Add to cart** | Known defect | Chromium and Firefox — 2 executions |

These four scenarios produce 11 expected-failure executions.

Playwright treats an expected failure as a successful suite outcome when the observed behavior matches the `test.fail()` annotation. An unexpected pass indicates that the application behavior may have changed and should be reviewed.

The `TC-CHK1-008` behavior remains under investigation because no official postal-code format requirements are available for the tested application.

## Cross-Browser Testing

The test suite is configured to run on:

- Chromium
- Firefox
- WebKit

### Latest Verified Local Execution

```text
127 passed
2 skipped
0 unexpected failures
47.0s
```

The suite contains 43 independent automated scenarios and 129 configured browser executions.

| Spec file | Scenarios |
|---|---:|
| `auth/logout.spec.ts` | 1 |
| `cart/cart.spec.ts` | 9 |
| `checkout/checkout-information.spec.ts` | 8 |
| `checkout/checkout-overview.spec.ts` | 7 |
| `inventory/inventory.spec.ts` | 6 |
| `login/login.spec.ts` | 7 |
| `navigation/menu.spec.ts` | 3 |
| `state/reset-app-state.spec.ts` | 2 |
| **Total** | **43** |

The 127 outcomes reported as passed by Playwright include expected failures. The actual distribution is:

| Result | Executions |
|---|---:|
| Regular passes | 116 |
| Expected failures | 11 |
| Skipped | 2 |
| Unexpected failures | 0 |
| **Total configured executions** | **129** |

### WebKit-Specific Limitation

`TC-RST-001` and `TC-RST-002` are skipped only on WebKit.

After products are added to the cart, the SauceDemo side menu may not open reliably in that browser engine. The limitation prevents the Reset App State option from being reached consistently.

The investigation produced the following results:

| Browser and condition | Result |
|---|---:|
| WebKit — menu without cart changes | 10/10 passed |
| WebKit — menu after adding products | 3/10 passed |
| Chromium — menu after adding products | 10/10 passed |
| Firefox — menu after adding products | 10/10 passed |

The same menu locator works reliably before the cart state changes and in the other tested browser engines. The Reset App State scenarios therefore remain active in Chromium and Firefox and are explicitly skipped in WebKit with a documented reason.

## Project Structure

```text
qa-ecommerce-playwright/
├── components/
│   └── menu-component.ts
├── fixtures/
│   └── authenticated-test.ts
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
│   ├── auth/
│   │   └── logout.spec.ts
│   ├── cart/
│   │   └── cart.spec.ts
│   ├── checkout/
│   │   ├── checkout-information.spec.ts
│   │   └── checkout-overview.spec.ts
│   ├── inventory/
│   │   └── inventory.spec.ts
│   ├── login/
│   │   └── login.spec.ts
│   ├── navigation/
│   │   └── menu.spec.ts
│   └── state/
│       └── reset-app-state.spec.ts
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

## Prerequisites

Before running the project, install:

- Node.js
- npm
- Git

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

List all configured tests without executing them:

```bash
npx playwright test --list
```

Run a specific spec file:

```bash
npx playwright test tests/cart/cart.spec.ts
```

Run a specific scenario by its test case ID:

```bash
npx playwright test --grep "TC-CAR-009"
```

Run a specific browser project:

```bash
npx playwright test --project=firefox
```

## Reports and Evidence

Playwright generates an HTML report after execution.

Open the latest report with:

```bash
npm run report
```

The current configuration also supports diagnostic artifacts for failed tests, including:

- screenshots;
- videos;
- error context;
- trace collection on retry.

Generated reports and temporary execution artifacts are not intended to be committed as source code unless selected as portfolio evidence.

## Current Automation Practices

The project currently applies:

- independent test scenarios;
- parallel test execution;
- cross-browser testing;
- reusable test data;
- reusable authenticated fixture for standard-user sessions;
- centralized authentication setup across seven test suites;
- traceability through test case IDs;
- monitoring of known defects with `test.fail()` annotations;
- explicit skips with documented technical reasons;
- Page Object Model where reuse provides value;
- reusable menu component;
- assertions for navigation, messages, calculations and page content;
- dynamic validation of product and order data;
- no fixed waits;
- screenshots and videos retained on failure;
- Playwright HTML reports;
- trace collection on test retry.

## Quality Decisions

The project follows these decisions:

- known application defects remain monitored instead of being removed from the suite;
- expected failures are distinguished from unexpected automation failures;
- `test.fail()` is applied only when the intended known behavior has been reached;
- browser-specific limitations are documented explicitly;
- unstable behavior is investigated through repeated and isolated execution;
- tests are not stabilized with arbitrary fixed waits;
- scenarios remain independent and prepare their own required state;
- authenticated setup is centralized without sharing state between tests;
- login tests remain independent because authentication itself is under test;
- validations focus on business behavior rather than only checking element visibility.

## Known Limitations

- SauceDemo is a public demonstration application and may change without notice;
- official business requirements are not available;
- no database access is available;
- no backend or API access is available;
- order persistence cannot be validated directly;
- payment, inventory and delivery integrations are simulated;
- the Reset App State flow is not executed in WebKit because of the documented side-menu limitation;
- mobile devices are not currently part of the configured suite;
- continuous integration has not yet been configured.

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
- Empty-cart checkout validation
- Cart Page Object
- Checkout information test scenarios
- Required customer information validation
- Checkout cancellation and cart persistence validation
- Checkout Information Page Object
- Reusable checkout test data
- Checkout overview and completion test scenarios
- Dynamic product data comparison between cart and checkout
- Item subtotal validation
- Tax and order total validation
- Checkout overview cancellation validation
- Successful purchase completion validation
- Cart cleanup validation after purchase
- Checkout Overview Page Object
- Checkout Complete Page Object
- Checkout confirmation page navigation
- Side menu navigation scenarios
- Reusable menu component
- Reusable authenticated fixture for standard-user sessions
- Authentication setup centralized across seven test suites
- Logout and authenticated-session validation
- Reset App State scenarios
- Known application issue monitoring with Playwright expected-failure annotations
- WebKit-specific side menu limitation investigated and documented
- Local HTML reporting
- Initial Git and GitHub setup
- Full regression execution with 129 configured executions: 116 regular passes, 11 expected failures, 2 skipped and 0 unexpected failures

### In Progress

- Test suite documentation and stability review
- Pull request review for the authenticated fixture refactoring

### Planned

- GitHub Actions pipeline
- Test execution evidence
- Traceability documentation
- Final project review

## Main Learnings

This project demonstrates practical experience with:

- test case automation from existing manual documentation;
- Playwright locators and assertions;
- Page Object Model and reusable components;
- reusable test data;
- reusable Playwright fixtures;
- centralized authenticated test setup;
- positive, negative and alternative scenarios;
- cross-browser execution;
- expected-failure monitoring;
- debugging flaky behavior;
- browser-specific investigation;
- dynamic calculation validation;
- test execution reporting;
- Git and GitHub workflow;
- incremental automation development.

## Author

**Lidia Martinelli**

Quality Assurance portfolio project focused on manual and automated software testing.
