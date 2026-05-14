import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testDir = defineBddConfig({
  features: 'features/*.feature',
  // 1. Include the fixture file in the steps scan
  steps: ['steps/*.js', 'fixtures/baseTest.js'], 
  // 2. Explicitly point to the fixture file
  //importTestFrom: './fixtures/baseTest.js', 
});

export default defineConfig({
  timeout: 60 * 1000, 
  expect: {
    timeout: 5000,    
  },
  testDir,
  fullyParallel: true,
  /* Keep 'html' reporter, but consider adding 'list' or 'line' 
     for better terminal feedback during execution.
  */
  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['list']
],

  use: {
    // This is used by page.goto('/') in your fixtures/pages
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    // Automatically sets headless to true if running in CI
    headless: !!process.env.CI,
    // Optional: Slows down operations by 'X' milliseconds so you can follow along
    launchOptions: {
      slowMo: 500,
      // 2. Add the start-maximized argument
      args: ['--start-maximized']
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', // Added: helpful for debugging BDD steps
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        // 1. DO NOT use ...devices['Desktop Chrome'] here
        // 2. Instead, define the browser type and maximize settings
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
  ],
});