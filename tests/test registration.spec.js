import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const REG_URL = 'https://realworld.qa.guru/';
const USER_NAME = faker.internet.username();
const PASSWORD = "Pss!";
const EMAIL = faker.internet.email({provider: 'example.com'});

test.describe('tests registration and authorization', ()=> { 

test('registration', async ({ page }) => {
  await page.goto(REG_URL);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(USER_NAME);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(USER_NAME);
});
/*test('authorization', async ({ page }) => {
})*/
})