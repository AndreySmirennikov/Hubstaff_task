import { defineConfig, devices } from '@playwright/test';

const baseURL = 'https://app.hubstaff.com/';

export default defineConfig({
  testDir: 'tests/specs',
  timeout: 200000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
      },
    ],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 30000,
    baseURL: baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  expect: {
    timeout: 20000,
  },
  outputDir: 'test-results/',
});
