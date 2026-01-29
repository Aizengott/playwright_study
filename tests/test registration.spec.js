import { test, expect } from '@playwright/test';
//import users from '../src/fixtures/testUsers.json' assert { type: 'json' };
import { RegAndAuth } from '../src/pages/regAndAuth';


test.describe('tests registration and authorization', ()=> { 

test('registration', async ({ page }) => {
  const regAndAuth = new RegAndAuth(page);
  await regAndAuth.openPage();
  await regAndAuth.registration();
  await regAndAuth.checkAuth("new")
});

test('authorization with correct password', async ({ page }) => {
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



test('authorization with unsighned email', async ({ page }) => {
  const regAndAuth = new RegAndAuth(page);
  await regAndAuth.openPage();
  await regAndAuth.auth("randomEmail");
  await regAndAuth.checkAuth("randomEmail");
 });

test('user can change the password', async ({ page }) => {
  const regAndAuth = new RegAndAuth(page);
  await regAndAuth.openPage();
  await regAndAuth.registration();
  await regAndAuth.changePassAndAuth();
 
}); 
});