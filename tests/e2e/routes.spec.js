// @ts-check
import { test, expect } from '@playwright/test';

let app = 'http://localhost:3000';

test('main page has right title', async ({ page }) => {
  await page.goto(app);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Contact Manager/);
});

test('contact list shows some contacts', async ({ page }) => {
  await page.goto(app);

  await page.getByRole('link', { name: 'Contacts' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Contact List/);


  const countactRowsCount = 
              await page.getByTestId('contactRow').count();

  expect(countactRowsCount).toBeGreaterThan(2);

});