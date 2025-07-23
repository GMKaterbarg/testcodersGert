import { expect, Locator, Page } from "playwright/test";
import { LoginPage } from "../pages/LoginPage";

export const constValues = {
    "successMessage": "Added successfully",
    "smalNameMessage": "Name must be at least 3 characters",
}

export class TestRpgBase {
    protected page: Page;
    public readonly description: Locator;
    public readonly applicationname: Locator;
    public readonly loginbutton: Locator;
    public readonly statsoverviewTitle: Locator;
    public charactername: Locator;
    public buildkind: Locator;
    public readonly startbutton: Locator;
    public readonly strenght: Locator;
    public readonly agility: Locator;
    public readonly wisdom: Locator;
    public readonly magic: Locator;
    public readonly level: Locator;
    public readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.description = this.page.locator('#description_input_control');
        this.applicationname = page.locator('h1:text("TestRPG")');
        this.loginbutton = page.locator('#login-button');
        this.statsoverviewTitle = page.locator('#stats_overview');
        this.charactername = page.getByPlaceholder('Galactic space lord');
    }

    async initialize(): Promise<void> {
        await new LoginPage(this.page).login();
    }


}
