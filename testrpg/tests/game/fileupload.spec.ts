import { test as base, Page, expect } from '@playwright/test';
import { fileupload } from '../../pages/game/fileupload';
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

const characterNormal = 'G'.repeat(12);


const test = base.extend<{
    fileuploadPage: fileupload;
    page: Page;
}>({
    fileuploadPage: async ({ page }, use) => {
        const fileuploadPage = new fileupload(page);
        await use(fileuploadPage);
    }
});

test.describe('Validate file upload functionality', () => {

    test.beforeEach(async ({ fileuploadPage }) => { await fileuploadPage.initialize(); });

    test('test fileuploader', async ({ fileuploadPage, page }) => {
        await fileuploadPage.fillNameAndSubmitAndUpload(characterNormal, 'testdata/testfile.txt');

        await expect(fileuploadPage.finishmessage).toContainText('File selected, level up!');
        await expect(fileuploadPage.uploadbutton).toBeDisabled();
    });


});
