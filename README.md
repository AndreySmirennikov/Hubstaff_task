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

## 🧪 Test Cases

This framework automates the following test cases:

-   **Sign up**: Covers the registration process for a new user.
-   **Sign in**: Automates the user login process.
    -   **Note**: This test is intentionally designed to fail. According to the test case, a successful sign-in should redirect the user to the Dashboard page. However, in the current application version, it redirects to the Insights page. The automated test follows the test case specification, causing a deliberate failure to highlight this discrepancy.
-   **Add/Create Project**: Automates the creation of a new project within the application.
-   **Bonus payment**: Covers the scenario related to bonus payments. (Further details to be specified).

## 🏗️ Framework Architecture

The project follows a standard Page Object Model (POM) design pattern for maintainable and scalable test automation.

### Project Structure

```
Hubstaff_task/
├── tests/
│   ├── specs/           # Contains the test specifications (test files)
├── framework/
│   ├── pages/           # Page Object Model classes
│   ├── utils/           # Utility functions and helpers
│   ├── wrapper/         # Wrappers for Playwright elements
│   └── fixtures/        # Test data and fixtures
├── package.json         # Project dependencies and scripts
└── playwright.config.ts # Playwright configuration
```

### Key Components

-   **`tests/specs/`**: This directory contains all the test scripts. Each file corresponds to a specific feature or module of the application.
-   **`tests/fixtures/`**: This directory contains base test configurations and fixtures that can be used across different tests.
-   **`framework/pages/`**: Each file in this directory represents a page in the application and contains the locators and methods specific to that page. This follows the Page Object Model (POM) design pattern.
-   **`framework/utils/`**: Contains helper functions, such as data generators or API clients, that can be used in the tests.
-   **`framework/wrapper/`**: This directory contains custom wrapper classes for Playwright's built-in elements (like `Button`, `Input`, etc.) to add custom logic or logging.
-   **`playwright.config.ts`**: The main configuration file for Playwright, where you can configure browsers, reporters, and other test settings.

## 📧 Email Verification

The framework includes a utility for handling email verification during the sign-up process. It can be configured to work with a real Gmail account to read verification links from incoming emails.

### Plus-Addressing for Gmail

To avoid creating multiple email accounts for testing, the framework uses the plus-addressing feature of Gmail.

-   **Base Email**: `your.email@gmail.com`
-   **Test Emails**: `your.email+test1@gmail.com`, `your.email+test2@gmail.com`

All emails sent to the plus-addresses will be delivered to the base email's inbox, allowing the framework to easily access them.

## 📊 Reporting

The framework is integrated with Allure for generating detailed test reports. When tests are run, Allure collects data and generates an HTML report with detailed information about each test, including steps, assertions, and attachments like screenshots for failed tests.

