import { test, expect, request } from '@playwright/test';

test('GET /smoketest/ with API Program payload', async ({ request }) => {
    const response = await request.get('https://test-rpg.vercel.app/api/builds');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log(data); // Log or validate the API response
});

