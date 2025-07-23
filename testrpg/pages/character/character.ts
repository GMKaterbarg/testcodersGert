import { Locator, Page } from '@playwright/test';
// Correct the import path and filename if necessary
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

export class character extends TestRpgBase {
    private readonly loggingWebAddress: Locator;
    public readonly applications: Locator;
    public readonly configurations: Locator;
    public workingApp: string | null;


    constructor(page: Page) {
        super(page);
        this.loggingWebAddress = page.locator("#loggingWebaddress_input_control");
        this.applications = page.locator('#config_architecture_applications');
        this.configurations = page.locator('#config_architecture_configurations');
        this.workingApp = null;
    }

    public async fillFields(name: string, description: string, webAddress: string, configurationSetting: string): Promise<void> {
        await this.charactername.fill(name);

    }
}