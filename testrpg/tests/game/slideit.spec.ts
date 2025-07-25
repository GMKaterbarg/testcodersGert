import { test as base, Page, expect } from '@playwright/test';
import { slider } from '../../pages/game/slideit';
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

const characterNormal = 'G'.repeat(12);


const test = base.extend<{
    sliderPage: slider;
    page: Page;
}>({
    sliderPage: async ({ page }, use) => {
        const sliderPage = new slider(page);
        await use(sliderPage);
    }
});

test.describe('Validate slider functionality', () => {

    test.beforeEach(async ({ sliderPage }) => { await sliderPage.initialize(); });

    test('test slider', async ({ sliderPage, page }) => {
        await sliderPage.fillNameAndSubmitandslide(characterNormal, '100');

        await expect(sliderPage.finishmessage).toContainText('Slid to the next level!');
        await expect(sliderPage.slider).toBeDisabled();
    });


});
