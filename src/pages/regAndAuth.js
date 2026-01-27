import { UserData } from '../userData.js';
import { test, expect } from '@playwright/test';
import users from '../fixtures/testUsers.json' assert { type: 'json' };

const regUrl = 'https://realworld.qa.guru/'; //страница регистрации


export class RegAndAuth {
    constructor (page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.loginLink = page.getByRole('link', { name: ' Login' });
                
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        
        this.nameField = page.getByRole('textbox', { name: 'Your Name' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });

        this.errorMessage = page.locator('.error-messages li');
        this.authName = page.locator('.dropdown-toggle.cursor-pointer'); //отображение имени пользователя на странице после успешной авторизации
    };

    async openPage(){   //открываем страницу регистрации
        
        await this.page.goto(regUrl, {waitUntil: 'domcontentloaded', timeout: 60000});
        console.log('страница регистрации открылась')
    }

    async registration(){
        console.log('тест на регистрацию пользователя начался')
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
        await expect(this.authName).toBeVisible();
        await expect(this.authName).toHaveText(user.userName)
    }

    async auth(accountName){
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
       
    }
    async checkAuth(accountName){ 
        let user;
        console.log(`проверка авторизации пользователя ${accountName}`)
        if (accountName === "valid")
            {user = users.valid
            await expect(this.authName).toBeVisible();
            await expect(this.authName).toHaveText(user.userName);
            }
        else if (accountName === "invalidPassword")
            {user = users.invalidPassword;
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toHaveText('Wrong email/password combination');
            }
        else if(accountName === "randomEmail")
            {user = new UserData().generate();   
            await expect(this.errorMessage).toBeVisible();
            await expect(this.errorMessage).toHaveText('Email not found sign in first')
            }
    }
};
