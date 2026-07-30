# Automated Test Traceability Matrix

## Purpose

This document maps the automated test cases to their covered feature, scenario classification, Playwright specification, browser coverage, and latest validated result.

The matrix helps demonstrate that the automation suite is based on identifiable test scenarios rather than isolated scripts without documented coverage.

## Execution Baseline

Latest validated local cross-browser regression:

- **43 automated test cases**
- **129 configured executions**
- **116 regular passes**
- **11 expected failures**
- **2 skipped executions**
- **0 unexpected failures**
- **Execution time:** 47.0 seconds
- **Browsers:** Chromium, Firefox, and WebKit

> Playwright reports `127 passed` because expected failures are counted as accepted results. The detailed breakdown is 116 regular passes and 11 expected failures.

## Status Legend

| Status | Meaning |
|---|---|
| Pass | The observed behavior matched the expected result. |
| Expected failure — known defect | The application behavior differs from the expected business rule and is intentionally monitored with `test.fail()`. |
| Expected failure — known limitation | The behavior is documented and monitored, but its final classification still depends on product requirements. |
| Skipped | Execution is intentionally blocked for a documented browser-specific limitation. |

## Coverage Summary

| Feature | Automated cases | Specification |
|---|---:|---|
| Login | 7 | [`tests/login/login.spec.ts`](../tests/login/login.spec.ts) |
| Authentication session | 1 | [`tests/auth/logout.spec.ts`](../tests/auth/logout.spec.ts) |
| Inventory | 6 | [`tests/inventory/inventory.spec.ts`](../tests/inventory/inventory.spec.ts) |
| Shopping cart | 9 | [`tests/cart/cart.spec.ts`](../tests/cart/cart.spec.ts) |
| Checkout information | 8 | [`tests/checkout/checkout-information.spec.ts`](../tests/checkout/checkout-information.spec.ts) |
| Checkout overview and confirmation | 7 | [`tests/checkout/checkout-overview.spec.ts`](../tests/checkout/checkout-overview.spec.ts) |
| Side menu navigation | 3 | [`tests/navigation/menu.spec.ts`](../tests/navigation/menu.spec.ts) |
| Reset App State | 2 | [`tests/state/reset-app-state.spec.ts`](../tests/state/reset-app-state.spec.ts) |
| **Total** | **43** | **8 specification files** |

## Login

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-LOG-001 | Log in with valid credentials | Positive | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-LOG-002 | Prevent login with an invalid username | Negative — authentication | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-LOG-003 | Prevent login with an invalid password | Negative — authentication | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-LOG-004 | Require the username field | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-LOG-005 | Require the password field | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-LOG-006 | Prevent login when both fields are empty | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-LOG-007 | Prevent a locked-out user from logging in | Negative — account-state validation | Chromium, Firefox, WebKit | Pass in all browsers |

**Automated specification:** [`tests/login/login.spec.ts`](../tests/login/login.spec.ts)

## Authentication Session

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-AUT-001 | Log out and prevent restoration of the authenticated session | Security and session management | Chromium, Firefox, WebKit | Pass in all browsers |

**Automated specification:** [`tests/auth/logout.spec.ts`](../tests/auth/logout.spec.ts)

## Product Inventory

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-INV-001 | Display the complete product catalog | Positive — catalog display | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-INV-002 | Display consistent product details | Data consistency | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-INV-003 | Sort products by name from A to Z | Business rule — sorting | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-INV-004 | Sort products by name from Z to A | Business rule — sorting | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-INV-005 | Sort products by price from low to high | Business rule — sorting | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-INV-006 | Sort products by price from high to low | Business rule — sorting | Chromium, Firefox, WebKit | Pass in all browsers |

**Automated specification:** [`tests/inventory/inventory.spec.ts`](../tests/inventory/inventory.spec.ts)

## Shopping Cart

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-CAR-001 | Add one product to the cart from the inventory page | Positive | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-002 | Add two different products to the cart | Positive | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-003 | Add a product to the cart from the product details page | Positive — alternative entry point | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-004 | Remove a product through the inventory page | Alternative flow — removal | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-005 | Remove a product from the cart page | Alternative flow — removal | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-006 | Continue shopping without losing cart items | State persistence | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-007 | Display consistent product data between inventory and cart | Data consistency | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-008 | Prevent the same product from being added twice | Negative — business rule | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CAR-009 | Prevent checkout with an empty cart | Negative — business rule | Chromium, Firefox, WebKit | Expected failure — known defect in all browsers |

**Automated specification:** [`tests/cart/cart.spec.ts`](../tests/cart/cart.spec.ts)

## Checkout Information

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-CHK1-001 | Continue checkout with valid customer information | Positive | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK1-002 | Require the first name field | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK1-003 | Require the last name field | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK1-004 | Require the postal code field | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK1-005 | Prevent checkout when all fields are empty | Negative — required-field validation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK1-006 | Cancel checkout information and return to the cart | Alternative flow — cancellation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK1-007 | Reject fields containing only spaces | Negative — input validation | Chromium, Firefox, WebKit | Expected failure — known defect in all browsers |
| TC-CHK1-008 | Reject an invalid postal code | Negative — input validation | Chromium, Firefox, WebKit | Expected failure — known limitation under investigation in all browsers |

**Automated specification:** [`tests/checkout/checkout-information.spec.ts`](../tests/checkout/checkout-information.spec.ts)

## Checkout Overview and Confirmation

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-CHK2-001 | Display the selected product in the checkout overview | Data consistency | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK2-002 | Calculate the item subtotal correctly | Calculation and business rule | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK2-003 | Calculate the order total correctly | Calculation and business rule | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK2-004 | Cancel the checkout overview and return to the inventory | Alternative flow — cancellation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK2-005 | Finish a valid purchase successfully | Positive — end-to-end flow | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CHK2-006 | Clear the cart after completing the purchase | State consistency | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-CNF-002 | Return to the inventory from the checkout confirmation page | Navigation | Chromium, Firefox, WebKit | Pass in all browsers |

**Automated specification:** [`tests/checkout/checkout-overview.spec.ts`](../tests/checkout/checkout-overview.spec.ts)

## Side Menu Navigation

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-MEN-001 | Return to the inventory using All Items | Navigation | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-MEN-002 | Open the About page | Navigation — external destination | Chromium, Firefox, WebKit | Pass in all browsers |
| TC-MEN-003 | Close the side menu | UI interaction | Chromium, Firefox, WebKit | Pass in all browsers |

**Automated specification:** [`tests/navigation/menu.spec.ts`](../tests/navigation/menu.spec.ts)

## Reset App State

| Test ID | Scenario | Classification | Browser coverage | Current result |
|---|---|---|---|---|
| TC-RST-001 | Clear the cart using Reset App State | State management | Chromium and Firefox; WebKit skipped | Expected failure — known defect in Chromium and Firefox; skipped in WebKit |
| TC-RST-002 | Keep the cart empty after reloading the inventory page | State persistence and recovery | Chromium and Firefox; WebKit skipped | Pass in Chromium and Firefox; skipped in WebKit |

**Automated specification:** [`tests/state/reset-app-state.spec.ts`](../tests/state/reset-app-state.spec.ts)

## Known Defects and Limitations

| Related test | Classification | Observed behavior |
|---|---|---|
| TC-CAR-009 | Known defect | SauceDemo allows checkout to start when the shopping cart is empty. |
| TC-CHK1-007 | Known defect | SauceDemo accepts whitespace-only values in required checkout fields. |
| TC-CHK1-008 | Known limitation under investigation | SauceDemo accepts non-numeric values and special characters as a postal code. |
| TC-RST-001 | Known defect | Reset App State clears the cart but does not immediately refresh the product action buttons. |
| TC-RST-001, TC-RST-002 | Browser-specific limitation | The SauceDemo side menu may not open reliably in WebKit after cart state changes. |

## Traceability Maintenance

This document should be updated when:

- a test case is added, removed, or renamed;
- a scenario changes its expected result;
- a known defect is fixed;
- browser coverage changes;
- a skipped test becomes executable;
- a test is moved to a different specification file;
- the latest validated regression result changes.
