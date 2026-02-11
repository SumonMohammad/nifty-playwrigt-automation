import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://meet.hub.niftyai.net/signin');
  await page.getByRole('textbox', { name: 'Enter username' }).click();
  await page.getByRole('textbox', { name: 'Enter username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('0000');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'History' }).click();
  await page.getByRole('heading', { name: 'Meeting History' }).click();
  await page.getByText('View and explore meeting').click();
  await page.locator('div').filter({ hasText: 'DenowattsFeb 3, 2026, 7:43' }).nth(5).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByText('completed').first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.locator('[id="_r_h_"]').getByText('Sign Out').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByLabel('Sign Out').getByRole('button', { name: 'Sign Out' }).click();
});