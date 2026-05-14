import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/baseTest.js'; // ✅ Use this instead
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

let response;
let userId;

Given('I prepare a GET request for user {string}', async ({}, userIdParam) => {
  userId = userIdParam; // store the userId for later use
  console.log(`Preparing request for user: ${userId}`);
});


When('I send the request to {string}', async ({ request }, endpoint) => {
  // Using the built-in 'request' fixture
  response = await request.get(`https://jsonplaceholder.typicode.com${endpoint}`);
});

Then('the response status code should be {int}', async ({}, statusCode) => {
  expect(response.status()).toBe(statusCode);
});

Then('the response body should contain name {string}', async ({}, expectedName) => {
  const body = await response.json();
  expect(body.name).toBe(expectedName);
});