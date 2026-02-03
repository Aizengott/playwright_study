import { test, expect } from '@playwright/test';
//import users from '../src/fixtures/testUsers.json' assert { type: 'json' };
import { RegAndAuth } from '../src/pages/regAndAuth';
import * as allure  from "allure-js-commons";


test.describe('tests registration and authorization', () => {

  test('registration', async ({ page }) => {
    //await allure.description("Тест на регистрацию нового пользователя"); //не отображается в отчете, надо разобраться
    await allure.owner("Aizengott Mess");
    await allure.tags("Authentication");
    await allure.severity("critical");
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.registration();
    await expect(regAndAuth.authName).toHaveText(regAndAuth.currentName)
  });

  test('authorization with correct password', async ({ page }) => {
    await allure.owner("Aizengott Mess");
    await allure.tags("Authentication");
    await allure.severity("critical");
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.auth("valid");
    await expect(regAndAuth.authName).toHaveText(regAndAuth.currentName);
  });


  test('authorization with incorrect password', async ({ page }) => {
    await allure.owner("Aizengott Mess");
    await allure.tags("Authentication");
    await allure.severity("normal");
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.auth("invalidPassword");
    await expect(regAndAuth.errorMessage).toHaveText('Wrong email/password combination');
  });



  test('authorization with unsighned email', async ({ page }) => {
    await allure.owner("Aizengott Mess");
    await allure.tags("Authentication");
    await allure.severity("normal");
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.auth("randomEmail");
    await expect(regAndAuth.errorMessage).toHaveText('Email not found sign in first')
  });

  test('user can change the password', async ({ page }) => {
    await allure.owner("Aizengott Mess");
    await allure.tags("Authentication");
    await allure.severity("middle");
    const regAndAuth = new RegAndAuth(page);
    await regAndAuth.openPage();
    await regAndAuth.registration();
    await regAndAuth.changePassAndAuth();
    //проверяем, что залогинились под старым именем
    await expect(regAndAuth.authName).toHaveText(regAndAuth.currentName);
    await expect(regAndAuth.globalFeedButton).toBeVisible();


  });
});