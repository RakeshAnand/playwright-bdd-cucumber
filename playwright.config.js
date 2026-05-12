import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.js',
  // This is the crucial line that links your fixtures folder:
  //importTestFrom: 'fixtures/baseTest.js', 
});

export default defineConfig({
  timeout: 60 * 1000, // Global timeout for each test
  expect: {
    timeout: 5000,    // Timeout for assertions
  },
  testDir,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});