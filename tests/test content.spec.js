import { test, expect } from '@playwright/test';
//import users from '../src/fixtures/testUsers.json' assert { type: 'json' };
import { RegAndAuth } from '../src/pages/regAndAuth';
import { Content } from '../src/pages/articlesAndComments';
//import * as allure from "allure-js-commons";


test.describe('tests adding content', ()=>{
    
    test.beforeEach(async ({page}) => {
        
        //авторизуемся
        const regAndAuth = new RegAndAuth(page);
        await regAndAuth.openPage();
        await regAndAuth.auth("valid");
    
    });
    
    test('test to add article', async ({ page }) => {
        const content = new Content(page);
        await test.step('Добавляем новую статью', async () => {
        console.log('тест - пользователь может добавить статью');
        await content.addArticle();
    });  
        await test.step('Проверка, что статья добавилась', async () => {
        //проверяем, что видна кнопка "добавить комментарий" и тело статьи соответствует исходному
        await expect(content.addCommentButton).toBeVisible();
        await expect(content.publishedArticleBody).toContainText(content.body);
    
    });
    });

    test('test to add comment', async ({ page }) => {
        const content = new Content(page);
        await test.step('добавляем новый комментарий к статье', async () => {
        console.log('тест - пользователь может добавить комментарий к статье');
        await content.addComment();
    });
        await test.step('Проверка, что комментарий добавился', async () => {
        await expect(content.publishedComment).toContainText(content.comment);
    });

});
});