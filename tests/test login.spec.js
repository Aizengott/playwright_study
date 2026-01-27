import { test, expect } from '@playwright/test';
import { RegAndAuth } from '../src/pages/regAndAuth';

test.describe('tests authorization', ()=> { 

       
    test('successfull authorization with correct password', async ({ page }) => {
      const regAndAuth = new RegAndAuth(page);
      await regAndAuth.openPage();
      await regAndAuth.auth("valid");
      await regAndAuth.checkAuth("valid")
     });
    
    test('authorization with incorrect password', async ({ page }) => {
        const regAndAuth = new RegAndAuth(page);
        await regAndAuth.openPage();
        await regAndAuth.auth("invalidPassword");
        await regAndAuth.checkAuth("invalidPassword")
       });








     //Ниже два теста, они (не работают) необязательные и должны быть не в этом файле, если их оставлять.
    test.skip('authorization restricted with wrong password', async ({ page }) => {
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
    
    test.skip('authorization restricted with unsighned email', async ({ page }) => {
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
