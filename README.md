# Hubstaff Automation Framework

This project is a test automation framework for the Hubstaff application, developed as a technical assignment. It utilizes Playwright with TypeScript to automate various test scenarios.

## 🚀 Quick Start

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or higher is recommended).

### Installation

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/hubstaff-automation.git
    cd hubstaff-automation
    ```

2.  Install the project dependencies:

    ```bash
    npm install
    ```

3.  Install the necessary browsers for Playwright:
    ```bash
    npm run install-browsers
    ```

### Running Tests

You can run the automated tests using the following commands:

-   **Run all tests in headless mode:**
    ```bash
    npm test
    ```
-   **Run tests in headed mode to see the browser UI:**
    ```bash
    npm run test:headed
    ```
-   **Run tests in debug mode for step-by-step execution:**
    ```bash
    npm run test:debug
    ```

### Viewing Reports

After the tests have been executed, you can view a detailed report:

```bash
npm run report
```

## 🏗️ Framework Architecture

The project follows a standard Page Object Model (POM) design pattern for maintainable and scalable test automation.

### Project Structure

```
Hubstaff_task/
├── .github/
│   └── workflows/
│       └── ci.yml            # CI pipeline (lint → e2e shards → reports)
├── tests/
│   └── specs/                # Test specifications
├── framework/
│   ├── pages/                # Page Object Model classes
│   ├── utils/                # Utilities and helpers
│   ├── wrapper/              # Element wrappers
│   └── fixtures/             # Test fixtures
├── package.json              # Scripts and deps
└── playwright.config.ts      # Playwright config (reporters, timeouts, etc.)
```

### Key Components

-   **`tests/specs/`**: All test scripts.
-   **`framework/pages/`**: Page Object Model (POM) classes.
-   **`framework/utils/`**: Helpers (e.g., mail, data generation).
-   **`framework/wrapper/`**: Wrapper classes over Playwright locators.
-   **`playwright.config.ts`**: Global configuration, reporters (HTML, Allure), traces/videos on failure.

## 🧪 Test Cases

This framework automates the following test cases:

-   **Sign up**: Covers the registration process for a new user.
-   **Sign in**: Automates the user login process.
-   **Add/Create Project**: Automates creation of a new project.
-   **Bonus payment**: One‑time bonus flow.

## 🧰 CI/CD (GitHub Actions)

The CI pipeline lives in `./.github/workflows/ci.yml` and runs on every push and PR, plus a nightly schedule.

- **Jobs order**:
  1. **lint**: ESLint check (Node 20).
  2. **e2e**: Playwright tests run inside container `mcr.microsoft.com/playwright:v1.54.1` in parallel shards.
     - Shards are defined via matrix (e.g., `[1,2]`).
     - Denominator uses `${{ strategy.job-total }}` so each shard runs as `--shard=<index>/${{ strategy.job-total }}`.
     - Each shard uploads two artifacts: `blob-report-<shard>` and `allure-results-<shard>`.
  3. **reports**: Aggregates artifacts from all shards and produces final reports:
     - Merges Playwright blob reports: `npx playwright merge-reports --reporter html blob-shards` → uploads `playwright-report-merged`.
     - Installs Allure CLI, merges `allure-results-*` into one folder and generates `allure-report`.

- **How to run it**:
  - Push to any branch or open a Pull Request — CI triggers automatically.
  - Manually: on the repository page → Actions → "CI - Lint and Playwright E2E" → Run workflow (optionally pass inputs like workers/test_suit(for example: smoke)).

- **Where to find results**:
  - Artifacts tab of the workflow run:
    - `playwright-report-merged` — final Playwright HTML report.
    - `allure-report` — final Allure HTML report.

Tips:
- To change sharding quickly, edit the matrix in `ci.yml` under `strategy.matrix.shard: [1,2]`.
- Traces/videos for failures are kept by Playwright config and visible from the reports.

## 📧 Email Verification

The framework includes a utility for handling email verification during the sign-up process. It can be configured to work with a real Gmail account to read verification links from incoming emails.

### Plus-Addressing for Gmail

To avoid creating multiple email accounts for testing, the framework uses the plus-addressing feature of Gmail.

-   **Base Email**: `your.email@gmail.com`
-   **Test Emails**: `your.email+test1@gmail.com`, `your.email+test2@gmail.com`

All emails sent to the plus-addresses will be delivered to the base email's inbox, allowing the framework to easily access them.

## 📊 Reporting

The framework is integrated with Allure and Playwright HTML reports. In CI, shard artifacts are merged into a single Allure HTML report (`allure-report`) and a single Playwright HTML report (`playwright-report-merged`). Open artifacts from the workflow run to view them locally.

