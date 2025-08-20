import { defineConfig, devices } from '@playwright/test';

// Environment handling
const ENV = (process.env.TEST_ENV || 'test').toLowerCase();
const TEST_SUITE = (process.env.TEST_SUITE || '').toLowerCase();

const environmentBaseUrlMap: Record<string, string> = {
  test: process.env.TEST_BASE_URL || 'https://app.hubstaff.com/',
  prod: process.env.PROD_BASE_URL || 'https://app.hubstaff.com/',
};

const baseURL = environmentBaseUrlMap[ENV] || environmentBaseUrlMap.test;

export default defineConfig({
  testDir: 'tests/specs',
  timeout: 200000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? (process.env.WORKERS ? Number(process.env.WORKERS) : 2) : 4,
  reporter: (process.env.CI
    ? [
        ['blob', { outputDir: 'blob-report' }],
        ['html', { open: 'never' }],
        [
          'allure-playwright',
          {
            detail: true,
            outputFolder: 'allure-results',
          },
        ],
      ]
    : [
        ['html', { open: 'never' }],
        [
          'allure-playwright',
          {
            detail: true,
            outputFolder: 'allure-results',
          },
        ],
      ]) as any,
  use: {
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    baseURL: baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  grep: TEST_SUITE ? new RegExp(`@${TEST_SUITE}`) : undefined,  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  expect: {
    timeout: 30000,
  },
  outputDir: 'test-results/',
});
