import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach((fixtures, testInfo) => {
  void fixtures;
  test.skip(!testInfo.project.name.startsWith("chromium"), "A11y matrix runs on Chromium viewports; smoke tests cover other engines.");
});

for (const route of ["/", "/servicos", "/contato"]) {
  test(`WCAG automated scan: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
