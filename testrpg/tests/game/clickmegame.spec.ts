import { test as base, Page, expect } from '@playwright/test';
import { clickmegame } from '../../pages/game/clickmegame';
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

const characterNormal = 'G'.repeat(12);



const test = base.extend<{
    clickmegamePage: clickmegame;
    page: Page;
}>({
    clickmegamePage: async ({ page }, use) => {
        const clickmegamePage = new clickmegame(page);
        await use(clickmegamePage);
    }
});

test.describe('Click action', () => {

    test.beforeEach(async ({ clickmegamePage }) => { await clickmegamePage.initialize(); });

    test('test 5-times click', async ({ clickmegamePage, page }) => {
        await clickmegamePage.fillNameAndSubmit(characterNormal);
        await clickmegamePage.clickme();

        await expect(clickmegamePage.levelup).toContainText('Great job! You levelled up');
    });


});
