import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: ['steps/*.js', 'fixtures/*.js'],
});

export default defineConfig({
  testDir, // ✅ Use the variable directly here
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
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
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ],
});