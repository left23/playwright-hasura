import fs from "node:fs";
import { test, expect } from '@playwright/test';

const lessonUrls: Array<{title: string, url: string, slug: string}> = JSON.parse(fs.readFileSync('data/lessons.json', 'utf8'));

lessonUrls.forEach(({title, url, slug}) => {
  test(`Check lesson "${title}" for title`, async ({ page }) => {
    console.log(`Testing URL: ${url}`);

    await page.goto(url);

    // Expect a title "to contain" a substring.
    // Create a regex pattern from a variable using RegExp.
    await expect(page).toHaveTitle(new RegExp(title));

  });
});
