import { test as base, Page, expect } from '@playwright/test';
import { character } from '../../pages/character/character';
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

type Ability = {
    name: string;
    Strength: number;
    Agility: number;
    Wisdom: number;
    Magic: number;
};

const characterNormal = 'testcoder';
const characterBuildTypes = ['Thief', 'Knight', 'Mage', 'Brigadier'];
const characterBuildsabilities: Ability[] = [
    { name: 'Knight', Strength: 6, Agility: 2, Wisdom: 1, Magic: 1 },
    { name: 'Thief', Strength: 1, Agility: 6, Wisdom: 2, Magic: 1 },
    { name: 'Mage', Strength: 0, Agility: 1, Wisdom: 3, Magic: 6 },
    { name: 'Brigadier', Strength: 3, Agility: 1, Wisdom: 6, Magic: 1 }
];


const test = base.extend<{
    characterPage: character;
    page: Page;
}>({
    characterPage: async ({ page }, use) => {
        const characterPage = new character(page);
        await use(characterPage);
    }
});

test.describe('Character build Validation', () => {

    test.beforeEach(async ({ characterPage }) => { await characterPage.initialize(); });

    test('test buildtypes', async ({ characterPage, page }) => {
        await characterPage.fillFields(characterNormal);
        for (const buildType of characterBuildTypes) {
            console.log(`Testing build type: ${buildType}`);
            await page.getByRole('combobox', { name: /Build/i }).click();
            await page.getByRole('option', { name: buildType }).click();

            // Assert selection
            await expect(page.getByRole('combobox', { name: /Build/i })).toHaveText(buildType);
        }
    });

    test('test buildtypes and ability ', async ({ characterPage, page }) => {
        await characterPage.fillFields(characterNormal);
        for (const build of characterBuildsabilities) {
            console.log(`Testing build: ${build.name}`);
            console.log(`Stats → Strength: ${build.Strength}, Agility: ${build.Agility}, Wisdom: ${build.Wisdom}, Magic: ${build.Magic}`);

            await page.getByRole('combobox', { name: /Build/i }).click();
            await page.getByRole('option', { name: build.name }).click();

            await expect(page.getByRole('combobox', { name: /Build/i })).toHaveText(build.name);
        }

    });


});
