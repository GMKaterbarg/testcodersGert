import { expect, Locator, test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERNAME } from '../playwright.config';

const test = base.extend<{ myLoginPage: LoginPage }>({
    myLoginPage: async ({ page }, use) => {
        const myLoginPage = new LoginPage(page);
        await use(myLoginPage);
    },
});

test.describe('Login Tests',
    () => {
        test.afterEach(async ({ page }) => {
            await page.close(); // Cleanup after each test
        });

        test('login', async ({ myLoginPage, page }) => {
            await myLoginPage.landingpage();
            const heroTitle = page.locator('[data-testid="hero"] h1')
            const logoutButton = page.locator('button[data-testid="logout-button"]');
            await expect(heroTitle).toBeVisible();
            await expect(heroTitle).toHaveText(`TestRPG`);
            await expect(logoutButton).toHaveText('Log out');
        });


        test('Verify Login page present after clicking Logout', async ({ myLoginPage, page }) => {
            await myLoginPage.login();
            const loginButton = page.locator('button[data-testid="login-button"]');
            await myLoginPage.logoutButton.click();
            await expect(loginButton).toHaveText('Login');
        });

        test('login and go to landingsite', async ({ myLoginPage, page }) => {
            await myLoginPage.login();
            const characterNameTitle = page.getByTestId('character-name');
            const logoutButton = page.locator('button[data-testid="logout-button"]');
            await expect(characterNameTitle).toHaveText('Your character');
        });

    });
