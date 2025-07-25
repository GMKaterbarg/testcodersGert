import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class slider extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public startbutton: Locator; // Replace with your submit button selector
    public slider: Locator
    public finishmessage: Locator;

    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name';
        this.startbutton = page.getByRole('button', { name: 'Start!' });
        this.slider = page.locator('[role="slider"][aria-orientation="horizontal"]')
        this.finishmessage = page.locator('span[data-task="slider"]', { hasText: 'Slid to the next level!' });
    }

    public async fillNameAndSubmit(name: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
    }
    public async fillNameAndSubmitandslide(name: string, value: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
        await this.slider.focus();
        for (let i = 0; i < 100; i++) {
            await this.page.keyboard.press('ArrowRight');
        }
    }

    public async moveSlider(value: string): Promise<void> {
        for (let i = 0; i < 100; i++) {
            await this.page.keyboard.press('ArrowRight');
        }
    }
}
