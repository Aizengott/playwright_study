import  { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

export class Content {
    constructor (page) {
        this.page = page;

        this.addArticleLink = page.getByRole('link', { name: ' New Article' });

        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.addCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' }); //кнопка перехода к статьям
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });

        this.articleTitleTextbox = page.getByRole('textbox', { name: 'Article Title' });
        this.articleSubjectTextbox = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleBodyTextbox = page.getByRole('textbox', { name: 'Write your article (in' });
        this.articleTagTextbox = page.getByRole('textbox', { name: 'Enter tags' });
        this.commentTextarea = page.locator('.article-page .comment-form .card-block textarea'); //поле для ввода комментария

        this.publishedArticleTitle =  page.locator('.article-preview .preview-link h1').nth(0); //заголовок первой статьи на странице статей
        this.publishedArticleBody = page.locator('.article-page .article-content p'); //текст опубликованной статьи на странице просмотра статьи
        this.publishedComment = page.locator('.card-text:last-child').last(); //опубликованный комментарий к статье
        

        this.title = faker.lorem.words({ min: 1, max: 3 });    //заголовок
        this.subject = faker.lorem.words(2);                   //тема
        this.body = faker.lorem.words(20);                  //тело статьи
        //this.tags = [];                                        //тэги
        this.comment = 'кошечка наследила тут';                 //комментарий

    };
    
    async addArticle(){
        //добавляет статью и проверяет ее наличие после публикации
        await this.addArticleLink.click();
        await expect(this.articleTitleTextbox).toBeVisible();
        await this.articleTitleTextbox.click();
        await this.articleTitleTextbox.fill(this.title);
        await this.articleSubjectTextbox.click();
        await this.articleSubjectTextbox.fill(this.subject);
        await this.articleBodyTextbox.click();
        await this.articleBodyTextbox.fill(this.body);
        //тут будут тэги
        //await this.articleTagTextbox.click();
        //await this.articleTagTextbox.fill('реклама');
        await this.publishArticleButton.click();
        //проверяем, что видна кнопка "добавить комментарий" и тело статьи соответствует исходному
        await expect(this.addCommentButton).toBeVisible();
        await expect(this.publishedArticleBody).toContainText(this.body);
    };

    async addComment(){
        //добавляет комментарий к последней статье на сайте и проверяет, что он добавился
        await expect(this.globalFeedButton).toBeVisible();
        await this.globalFeedButton.click();
        await expect(this.publishedArticleTitle).toBeVisible();
        await this.publishedArticleTitle.click();
        await expect(this.commentTextarea).toBeVisible();
        await this.commentTextarea.click();
        await this.commentTextarea.fill(this.comment)
        await this.postCommentButton.click();
        await expect(this.publishedComment).toBeVisible();
        await expect(this.publishedComment).toContainText(this.comment);
    }
}    
