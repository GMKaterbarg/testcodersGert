import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class clickmegame extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public startbutton: Locator; // Replace with your submit button selector
    public clickmebutton: Locator
    public readonly levelup: Locator;

    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name'; // Replace with your input's selector
        this.startbutton = page.getByRole('button', { name: 'Start!' }); // Use the static property from TestRpgBase        
        this.clickmebutton = page.getByRole('button', { name: /Click me \d+ times/, });
        this.levelup = page.locator('[data-task="clicker"]');
    }

    public async fillNameAndSubmit(name: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
        //for (let i = 0; i < 5; i++) {
        //await this.clickmebutton.click();
    }

    public async clickme(): Promise<void> {
        for (let i = 0; i < 5; i++) {
            await this.clickmebutton.click();
        }
    }
}
