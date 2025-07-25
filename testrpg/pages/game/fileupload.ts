import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class fileupload extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public startbutton: Locator; // Replace with your submit button selector
    public uploadbutton: Locator
    public finishmessage: Locator;

    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name';
        this.startbutton = page.getByRole('button', { name: 'Start!' });
        this.uploadbutton = page.getByRole('button', { name: 'Choose File' });
        this.finishmessage = page.locator('span[data-task="uploader"]', { hasText: 'File selected, level up!' });
    }

    public async fillNameAndSubmit(name: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
    }
    public async fillNameAndSubmitAndUpload(name: string, filename: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
        await this.uploadbutton.click();
        await this.uploadbutton.setInputFiles(filename);
    }
    public async uploader(filename: string): Promise<void> {
        await this.uploadbutton.click();
        await this.uploadbutton.setInputFiles(filename);
    }
}
