# Playwright e2e TypeScript Framework

This project demonstrates how to structure a maintainable UI automation framework using:
- Page Object Model
- custom fixtures
- reusable test data
- environment-based configuration
- ESLint + Prettier
- GitHub Actions CI

It covers
- maintainable test design
- reusable fixtures and page objects
- positive and negative scenarios
- CI execution in GitHub Actions
- clean project organization for scaling

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- ESLint
- Prettier
- GitHub Actions

---

## Application Under Test

**SauceDemo**

Main workflows covered:
- login
- invalid login
- locked out user validation
- inventory page validation
- product sorting
- add to cart
- remove from cart
- checkout flow
- checkout form validation

---

## Project Structure

```text
.
├── .github/workflows/    # CI pipeline
├── fixtures/             # Custom Playwright fixtures
├── pages/                # Page Object Model classes
├── test-data/            # Static test data
├── tests/                # Test specifications
├── utils/                # Helpers and environment loader
├── .env.example          # Example environment variables
├── playwright.config.ts  # Playwright configuration
└── README.md
