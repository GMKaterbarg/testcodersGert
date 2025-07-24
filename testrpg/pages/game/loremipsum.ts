import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class loremipsum extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public startbutton: Locator; // Replace with your submit button selector
    public loreminputfield: Locator
    public readonly levelupmessage: Locator;



    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name';
        this.startbutton = page.getByRole('button', { name: 'Start!' });
        this.loreminputfield = page.getByRole('textbox');

        //page.locator('div.flex.items-center.justify-between input');
        //this.loreminputfield = page.getByTestId('adventure-typer').locator('input[data-ms-editor="true"]'); // Adjust the selector as needed
        //page.locator('[data-testid="adventure-typer"] input[data-ms-editor="true"]');
        this.levelupmessage = page.locator('span[data-task="typer"]');
    }

    public async fillNameAndSubmit(name: string, text: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
    }
    public async fillNameAndSubmitandfill(name: string, text: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
        await this.loreminputfield.fill(text);
    }
    public async loremIpsumInput(text: string): Promise<void> {
        await this.loreminputfield.fill(text);
    }
}
