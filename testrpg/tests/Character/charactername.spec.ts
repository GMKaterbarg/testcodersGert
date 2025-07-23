import { test as base, Page, expect } from '@playwright/test';
import { character } from '../../pages/character/character';
import { TestRpgBase, constValues } from "../../utils/SelectRpgBase";

const characterToSmall = 'G'.repeat(2);
const characterToMinimum = 'G'.repeat(3);
const characterNormal = 'G'.repeat(12);
const characterToMaximum = 'G'.repeat(20);
const characterToBig = 'G'.repeat(21);


const test = base.extend<{
    characterPage: character;
    page: Page;
}>({
    characterPage: async ({ page }, use) => {
        const characterPage = new character(page);
        await use(characterPage);
    }
});

test.describe('Character Name Validation', () => {

    test.beforeEach(async ({ characterPage }) => { await characterPage.initialize(); });

    test('shows error for name shorter than 3 characters', async ({ characterPage, page }) => {
        await characterPage.fillNameAndSubmit(characterToSmall);
        const errorMessageLocator = page.getByText('Name must be at least 3 characters');
        await expect(errorMessageLocator).toContainText('must be at least 3 characters');
    });

    test('shows error for name longer than 20 characters', async ({ characterPage, page }) => {
        await characterPage.fillNameAndSubmit(characterToBig);
        const errorMessageLocator = page.getByText('Name cannot be longer than 20 characters');
        await expect(errorMessageLocator).toContainText('Name cannot be longer than 20 characters');
    });

    test('accepts name between 3 and 20 characters', async ({ characterPage, page }) => {
        await characterPage.fillNameAndSubmit(characterNormal);
        const errorMessageLocator = page.getByText('Name must be at least 3 characters');
        await expect(errorMessageLocator).toBeHidden();
    });

    test('input of exactly 3 characters', async ({ characterPage, page }) => {
        await characterPage.fillNameAndSubmit(characterToMinimum);
        const errorMessageLocator = page.getByText('Name must be at least 3 characters');
        await expect(errorMessageLocator).toBeHidden();
    });

    test('input of exactly 20 characters', async ({ characterPage, page }) => {
        await characterPage.fillNameAndSubmit(characterToMaximum);
        const errorMessageLocator = page.getByText('Name must be at least 3 characters');
        await expect(errorMessageLocator).toBeHidden();
    });

});
