import { expect, test } from "@playwright/test";

test("home renders the primary experience without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("main#conteudo")).toBeVisible();
  await expect(page.locator("h1").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("core public routes respond", async ({ page }) => {
  for (const route of ["/", "/servicos", "/sobre", "/contato", "/faq"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBeLessThan(400);
  }
});

test("contact form rejects incomplete submission accessibly", async ({ page }) => {
  await page.goto("/contato");
  const submit = page.getByRole("button", { name: /enviar mensagem/i });
  if (await submit.count()) {
    await submit.click();
    await expect(page.getByRole("alert")).toBeVisible();
  }
});

test("health endpoint exposes platform version", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toMatchObject({ ok: true, platform: "nexora-website-platform", version: "3.0.0" });
});


test("all registered section variants render in development lab", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/dev/variants", { waitUntil: "domcontentloaded" });
  expect(await page.locator("[data-variant]").count()).toBeGreaterThanOrEqual(40);
  expect(errors).toEqual([]);
});

test("content stress fixture has no horizontal document overflow", async ({ page }) => {
  await page.goto("/dev/stress");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
