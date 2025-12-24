import { test, expect } from '@playwright/test';
import { UserData } from './src/userData';
//import { faker } from '@faker-js/faker';

const REG_URL = 'https://realworld.qa.guru/';

test.describe('tests registration and authorization', ()=> { 

test('registration', async ({ page }) => {
  const user = new UserData().generate();
  //console.log(user);
  await page.goto(REG_URL);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(user.userName);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(user.userName);
});
/*test('authorization', async ({ page }) => {
})*/
})