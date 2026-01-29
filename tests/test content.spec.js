import { test, expect } from '@playwright/test';
//import users from '../src/fixtures/testUsers.json' assert { type: 'json' };
import { RegAndAuth } from '../src/pages/regAndAuth';
import { Content } from '../src/pages/articlesAndComments';

test.describe('tests adding content', ()=>{
    let context;

    test.beforeEach(async ({page}) => {
        
        //авторизуемся
        const regAndAuth = new RegAndAuth(page);
        await regAndAuth.openPage();
        await regAndAuth.auth("valid");
    });
    
    test('test to add article', async ({ page }) => {
        console.log('тест - пользователь может добавить статью');
        const content = new Content(page);
        await content.addArticle();

    });

    test('test to add comment', async ({ page }) => {
        console.log('тест - пользователь может добавить комментарий к статье');
        const content = new Content(page);
        await content.addComment();
    });
});