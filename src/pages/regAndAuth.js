import { UserData } from '../userData.js';
import { test, expect } from '@playwright/test';
import users from '../fixtures/testUsers.json' assert { type: 'json' };

const regUrl = 'https://realworld.qa.guru/'; //страница регистрации


export class RegAndAuth {
    constructor (page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });  
        this.loginLink = page.getByRole('link', { name: ' Login' });
        this.settingsLink = page.getByRole('link', { name: ' Settings' });
        this.logoutLink = page.getByRole('link', { name: ' Logout' })

        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.updateButton = page.getByRole('button', { name: 'Update Settings' }); //кнопка обновить данные в настройках

        this.nameField = page.getByRole('textbox', { name: 'Your Name' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });

        this.errorMessage = page.locator('.error-messages li'); // ошибка, если есть
        this.authName = page.locator('.dropdown-toggle.cursor-pointer'); //отображение имени пользователя на странице после успешной авторизации

        this.currentEmail = null; //почта авторизованного пользователя
        this.currentName = null; //имя авторизованного пользователя
    };

    async openPage(){   //открываем базовую страницу 
        await this.page.goto(regUrl, {waitUntil: 'domcontentloaded', timeout: 60000});
        
    }

    async registration(){
        //только регистрация без проверок
        const user = new UserData().generate(); //генерируем пользователя
       
        await expect(this.signUpLink).toBeVisible();
        await this.signUpLink.click();
        await this.nameField.click();
        await this.nameField.fill(user.userName);
        await this.emailField.click();
        await this.emailField.fill(user.email);
        await this.passwordField.click();
        await this.passwordField.fill(user.password);
        await this.signUpButton.click();
        
        this.currentEmail = user.email; //сохраняем почту авторизованного пользователя
        this.currentName = user.userName; //сохраняем имя авторизованного пользователя
        //убрать отсюда проверку, добавить ее в checkAuth(accountName)
        //await expect(this.authName).toBeVisible();
        //await expect(this.authName).toHaveText(user.userName)
    }

    async auth(accountName){
        //только авторизация без проверок
        let user;
        console.log(`авторизуется пользователь ${accountName}`)
        if (accountName === "valid")
            {user = users.valid}
        else if (accountName === "invalidPassword")
            {user = users.invalidPassword}
        else if(accountName === "randomEmail")
            {user = new UserData().generate(); };
        //console.log(user);
        
        await expect(this.loginLink).toBeVisible();
        await this.loginLink.click();
        await this.emailField.click();
        await this.emailField.fill(user.email);
        await this.passwordField.click();
        await this.passwordField.fill(user.password);
        await this.loginButton.click();
        this.currentEmail = user.email; //сохраняем почту авторизованного пользователя
        this.currentName = user.userName; //сохраняем имя авторизованного пользователя
        //console.log(`Сохранили имя пользователя ${this.currentName}`)
    }
   
    async changePassAndAuth(){
        //из авторизованного состояния меняем пароль и авторизуемся с новым паролем
        //console.log(`авторизован пользователь ${this.currentEmail}`)
        const newPass = "newPassword"

        await this.authName.click();
        await expect(this.settingsLink).toBeVisible(); 
        await this.settingsLink.click();
        await expect(this.passwordField).toBeVisible();
        await this.passwordField.click(); 
        await this.passwordField.fill(`${newPass}`);
        await this.updateButton.click();
        //ждем, пока кнопка исчезнет - признак, что обновили пароль
        await expect(this.updateButton).toBeHidden();
        await this.authName.click();
        await expect (this.logoutLink).toBeVisible();
        await this.logoutLink.click();

        //теперь надо залогиниться с новым паролем
        await expect(this.loginLink).toBeVisible();
        await this.loginLink.click();
        await this.emailField.click();
        await this.emailField.fill(this.currentEmail);
        await this.passwordField.click();
        await this.passwordField.fill(`${newPass}`);
        await this.loginButton.click();
        
    }
};
