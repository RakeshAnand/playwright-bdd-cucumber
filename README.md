# Playwright + Cucumber BDD Project

This repository demonstrates a Behavior‑Driven Development (BDD) test automation framework using **Playwright** and **Cucumber.js**.

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Git installed and configured

---

## 🚀 Setup

Clone the repository:

```bash
git clone https://github.com/RakeshAnand/playwright-bdd-cucumber.git
cd playwright-bdd-cucumber


C:.
│   .env
│   .gitignore
│   .prettierrc
│   package.json
│   playwright.config.js
│   README.md
│   
├───.vscode
│       launch.json
├───data
│       customers.json
├───features
│       customer.feature
│       login.feature
├───fixtures
│       baseTest.js          <-- This is the "Heart" of your project
├───pages
│       CountryPage.js
│       CustomerPage.js
│       HomePage.js
│       LoginPage.js
└───steps
        country.steps.js
        customer.steps.js
        homeSteps.js
        loginSteps.js



Execution Checklist
Run these commands in order to kick off your project:

Clear old artifacts:
rmdir /s /q .features-gen test-results playwright-report (Windows command to ensure a clean start).

Install dependencies:
npm install

Run the tests:
npm test

Summary of what your framework now does:
Parallelism: Runs multiple scenarios at once by default.

Auto-Waiting: No more time.sleep or manual waits; Playwright handles it.

Zero-Setup Steps: You don't need to write new LoginPage(page) inside your steps anymore; just destructure it: Given('...', async ({ loginPage }) => { ... }).

Rich Debugging: If a test fails, run npx playwright show-report to see the exact video and trace of the failure.