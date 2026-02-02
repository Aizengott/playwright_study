import { test, expect } from '@playwright/test';
//import users from '../src/fixtures/testUsers.json' assert { type: 'json' };
import { RegAndAuth } from '../src/pages/regAndAuth';


test.describe('tests registration and authorization', () => {

  test('registration', async ({ page }) => {
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.registration();
    //await regAndAuth.checkAuth("new")
    await expect(regAndAuth.authName).toBeVisible();
    await expect(regAndAuth.authName).toHaveText(regAndAuth.currentName)
  });

  test('authorization with correct password', async ({ page }) => {
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.auth("valid");
    //await regAndAuth.checkAuth("valid")
    await expect(regAndAuth.authName).toBeVisible();
    await expect(regAndAuth.authName).toHaveText(regAndAuth.currentName);
  });


  test('authorization with incorrect password', async ({ page }) => {
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.auth("invalidPassword");
    //await regAndAuth.checkAuth("invalidPassword")
    await expect(regAndAuth.errorMessage).toBeVisible();
    await expect(regAndAuth.errorMessage).toHaveText('Wrong email/password combination');
  });



  test('authorization with unsighned email', async ({ page }) => {
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.auth("randomEmail");
    //await regAndAuth.checkAuth("randomEmail");
    await expect(regAndAuth.errorMessage).toBeVisible();
    await expect(regAndAuth.errorMessage).toHaveText('Email not found sign in first')
  });

  test('user can change the password', async ({ page }) => {
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.registration();
    await regAndAuth.changePassAndAuth();
    //проверяем, что залогинились под старым именем
    await expect(regAndAuth.authName).toBeVisible();
    await expect(regAndAuth.authName).toHaveText(regAndAuth.currentName)


  });
});