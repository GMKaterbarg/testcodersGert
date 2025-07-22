import { test, expect, Page } from '@playwright/test';

test.describe('Character Name Validation', () => {
    const url: string = 'https://test-rpg.vercel.app/play'; // Replace with your actual app URL
    const nameInputSelector: string = '#character-name'; // Replace with your input's selector
    const submitButtonSelector: string = '#submit'; // Replace with your submit button selector
    const errorMessageSelector: string = '#name-error'; // Replace with your error message element selector

    const fillNameAndSubmit = async (page: Page, name: string): Promise<void> => {
        await page.fill(nameInputSelector, name);
        await page.click(submitButtonSelector);
    };

    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    test('shows error for name shorter than 3 characters', async ({ page }) => {
        await fillNameAndSubmit(page, 'Al');
        await expect(page.locator(errorMessageSelector)).toContainText('must be at least 3 characters');
    });

    test('shows error for name longer than 20 characters', async ({ page }) => {
        await fillNameAndSubmit(page, 'A'.repeat(21));
        await expect(page.locator(errorMessageSelector)).toContainText('must be at most 20 characters');
    });

    test('accepts name between 3 and 20 characters', async ({ page }) => {
        await fillNameAndSubmit(page, 'ValidName');
        await expect(page.locator(errorMessageSelector)).toBeHidden();
    });
});
