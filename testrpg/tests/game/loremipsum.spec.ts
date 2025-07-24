import { test as base, Page, expect } from '@playwright/test';
import { loremipsum } from '../../pages/game/loremipsum';
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

const characterNormal = 'G'.repeat(12);
const inputtext = 'Lorem Ipsum';


const test = base.extend<{
    loremipsumPage: loremipsum;
    page: Page;
}>({
    loremipsumPage: async ({ page }, use) => {
        const loremipsumPage = new loremipsum(page);
        await use(loremipsumPage);
    }
});

test.describe('Validate Input Lorem Ipsum', () => {

    test.beforeEach(async ({ loremipsumPage }) => { await loremipsumPage.initialize(); });

    test('test Lorem Ipsum', async ({ loremipsumPage, page }) => {
        await loremipsumPage.fillNameAndSubmitandfill(characterNormal, inputtext);

        await expect(loremipsumPage.levelupmessage).toContainText('Dolar sit amet!');
    });


});
