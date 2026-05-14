import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// BDD config
const bddConfig = defineBddConfig({
  features: 'features/*.feature',
  steps: ['steps/*.js', 'fixtures/baseTest.js'],
  // importTestFrom: './fixtures/baseTest.js', // optional explicit import
});

export default defineConfig({
  ...bddConfig, // ✅ spread BDD config here
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: 500,
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
