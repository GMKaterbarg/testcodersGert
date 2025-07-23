import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class character extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public startbutton: Locator; // Replace with your submit button selector


    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name'; // Replace with your input's selector
        this.startbutton = page.getByRole('button', { name: 'Start!' }); // Use the static property from TestRpgBase        
    }

    public async fillFields(name: string, description: string, webAddress: string, configurationSetting: string): Promise<void> {
        await this.charactername.fill(name);
    }

    public async fillNameAndSubmit(name: string): Promise<void> {
        await this.charactername.fill(name);
        await this.startbutton.click();
    };


}
