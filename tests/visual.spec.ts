import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

const snapshotDir = path.join(process.cwd(), "tests", "visual.spec.ts-snapshots");
const hasBaselines = fs.existsSync(snapshotDir) && fs.readdirSync(snapshotDir).some((file) => file.endsWith(".png"));

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("chromium"), "Visual baselines use Chromium at 390/768/1440.");
  test.skip(!hasBaselines, "Generate the first reviewed baseline with `npm run test:visual:update`.");
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("home visual baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("home.png", { fullPage: true, animations: "disabled" });
});

test("components visual baseline", async ({ page }) => {
  await page.goto("/dev/components", { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot("components.png", { fullPage: true, animations: "disabled" });
});
