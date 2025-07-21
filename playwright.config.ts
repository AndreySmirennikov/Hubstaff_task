import { defineConfig, devices } from '@playwright/test';

const baseURL = 'https://app.hubstaff.com/';

export default defineConfig({
  testDir: 'tests/specs',
  timeout: 200000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : 2,
  reporter: [['html', { open: 'never' }], ['allure-playwright', {
    detail: true,
    outputFolder: 'allure-results',
  }]],
  use: {
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 30000,
    baseURL: baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  expect: {
    timeout: 20000,
  }
}); 