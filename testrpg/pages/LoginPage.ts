import { Locator, Page } from '@playwright/test';
import { BASE_URL, PASSWORD, USERNAME } from '../playwright.config';

export class LoginPage {
    protected page: Page
    public loginButton: Locator;
    public usernameField: Locator;
    public clickTopPlay: Locator;
    public passwordField: Locator;
    public submitButton: Locator;
    public errorMessage: Locator;
    public logoutButton: Locator;
    public characterNameTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = this.page.locator('button[data-testid="login-button"]')
        this.clickTopPlay = this.page.getByRole('link', { name: 'Click here to play' })
        this.usernameField = this.page.locator('input[id=":r0:-form-item"]');
        this.passwordField = this.page.locator('input[id=":r1:-form-item"]');
        this.submitButton = this.page.locator('button[type="submit"]:has-text("Login")');
        this.errorMessage = this.page.locator('#input-error-username');
        this.logoutButton = this.page.getByTestId('logout-button');
        this.characterNameTitle = this.page.getByTestId('character-name');
    }

    public async login(): Promise<void> {
        await this.page.goto(BASE_URL);
        try {
            await this.loginButton.click();
        } catch (error) {
            throw new Error(`Failed to click the login button. Check if button present on page`);
        }
        await this.usernameField.fill(USERNAME);
        await this.passwordField.fill(PASSWORD);
        await this.submitButton.click();
    };

}
