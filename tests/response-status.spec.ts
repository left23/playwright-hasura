import fs from "node:fs";
import { test, expect } from '@playwright/test';

const lessonUrls: Array<{title: string, url: string, slug: string}> = JSON.parse(fs.readFileSync('data/lessons.json', 'utf8'));

lessonUrls.forEach(({title, url, slug}) => {
  test(`Check lesson "${slug}" response status`, async ({ page }) => {
    console.log(`Testing URL: ${url}`);

    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
  });
});
