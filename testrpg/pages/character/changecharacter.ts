import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class character extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public readonly buildCombobox: Locator;
    public startbutton: Locator;
    public buildKind: string;


    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name'; // Replace with your input's selector
        this.startbutton = page.getByRole('button', { name: 'Start!' }); // Use the static property from TestRpgBase
        this.buildCombobox = page.getByRole('option', { name: this.buildKind }); // Assuming there's a combobox for build kind        
    }

    public async fillFields(name: string, buildkind: string): Promise<void> {
        await this.charactername.fill(name);
        await this.buildCombobox.selectOption(buildkind);
    }

    public async fillNameAndSubmit(name: string, buildkind: string): Promise<void> {
        await this.charactername.fill(name);
        await this.buildCombobox.selectOption(buildkind);
        await this.startbutton.click();
    };


}
