import { test, expect } from '@playwright/test';
import { UserData } from '../src/userData.js';
import users from '../fixtures/testUsers.json' assert { type: 'json' };

const regUrl = 'https://realworld.qa.guru/'; //страница регистрации

test.describe('tests registration and authorization', ()=> { 

test('registration', async ({ page }) => {
  const user = new UserData().generate();
  console.log(user);
  await page.goto(regUrl);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(user.userName);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator('.dropdown-toggle.cursor-pointer')).toBeVisible;
  await expect(page.locator('.dropdown-toggle.cursor-pointer')).toHaveText(user.userName)
  //const navigationText = await page.getByRole('navigation').textContent();  //проверяем, что мы вообще видим в тексте
  //console.log('Actual navigation text:', navigationText);
});
test('authorization with correct password', async ({ page }) => {
  const user = users.valid;
  //console.log(user);
  await page.goto(regUrl);
  await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('.dropdown-toggle.cursor-pointer')).toBeVisible;
  await expect(page.locator('.dropdown-toggle.cursor-pointer')).toHaveText(user.userName);
});
test('authorization with wrong password', async ({ page }) => {
  const user = users.invalidPassword;
  //console.log(user);
  await page.goto(regUrl);
  await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('.error-messages li')).toBeVisible;
  await expect(page.locator('.error-messages li')).toHaveText('Wrong email/password combination');
});
test('authorization with new email', async ({ page }) => {
  const user = users.invalidEmail;
  //console.log(user);
  await page.goto(regUrl);
  await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('.error-messages li')).toBeVisible;
  await expect(page.locator('.error-messages li')).toHaveText('Email not found sign in first');
})
})