
1)Описание скриптов из package.json:

    "test": "npx playwright test",
    "ui": "npx playwright test --ui",
    "reportallure": "npx allure serve ./allure-results ", --- показать отчет allure в режиме live server
    "clear" : "rimraf allure-results allure-report" --- очистка папок с отчетами тестов

