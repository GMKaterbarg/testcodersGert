import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class chcharacter extends TestRpgBase {
    public readonly characterNameTitle: Locator;
    public nameInputSelector: string;
    public readonly buildCombobox: Locator;
    public startbutton: Locator;
    public buildKind: string;
    public strengthLocator: Locator;
    public agilityLocator: Locator;
    public wisdomLocator: Locator;
    public magicLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.characterNameTitle = page.getByRole('heading', { name: 'Choose a name and build', level: 3 });
        this.nameInputSelector = '#character-name';
        this.startbutton = page.getByRole('button', { name: 'Start!' });
        this.buildCombobox = page.getByRole('option', { name: this.buildKind });
        this.strengthLocator = page.locator('[data-character-stats="Strength"] >> span.text-sm');
        this.agilityLocator = page.locator('[data-character-stats="Agility"] >> span.text-sm');
        this.wisdomLocator = page.locator('[data-character-stats="Wisdom"] >> span.text-sm');
        this.magicLocator = page.locator('[data-character-stats="Magic"] >> span.text-sm');
    }

    public async fillname(name: string): Promise<void> {
        await this.charactername.fill(name);
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
