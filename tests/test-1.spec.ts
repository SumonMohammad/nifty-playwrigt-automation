import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5004/');
  await page.getByRole('link', { name: 'Sign In', exact: true }).click();
  await page.getByRole('link', { name: 'Sign in with Zoom' }).click();
});
await page.getByRole('link', { name: 'Sign in with Zoom' }).click();