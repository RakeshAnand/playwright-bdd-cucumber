import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

// Define the BDD configuration
const bddConfig = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.js',
  // 1. Point this to your actual fixtures/baseTest.js file
  importTestFrom: './fixtures/baseTest.js',
});

export default defineConfig({
  // Use the correct variable name here
  testDir: bddConfig, 
  
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    // CI check for headless mode
    headless: !!process.env.CI,
    launchOptions: { 
      slowMo: 500, 
      args: ['--start-maximized'] 
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
        // viewport: null works with --start-maximized to fill the screen
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});