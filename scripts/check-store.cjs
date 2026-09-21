// Run against a local production server. PLAYWRIGHT_MODULE points to an existing
// Playwright installation; the application itself needs no browser-test dependency.
/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const output = process.env.TEST_SCREENSHOTS || ".next-verify/screenshots";

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem("seasilk:newsletter-popup:subscribed", "true");
  });
  await page.goto(base + "/");
  await page.waitForTimeout(1500);
  assert.equal(
    await page.evaluate(() => scrollY),
    0,
    "homepage starts at the top",
  );
  const routes = [
    "/shop",
    "/collections",
    "/collections/genius-weft",
    "/collections/tape-ins",
    "/collections/clip-ins",
    "/best-sellers",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
    "/account",
    "/cart",
    "/checkout",
    "/search?q=blonde",
  ];
  for (const route of routes) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator("h1").count(), 1, route + " h1");
    assert.match(await page.title(), /SeaSilk/);
  }
  const missing = await page.goto(base + "/products/not-a-product");
  assert.equal(missing.status(), 404);
  const missingInfo = await page.goto(base + "/not-a-page");
  assert.equal(missingInfo.status(), 404);
  await page.goto(base + "/shop");
  const productLinks = await page
    .locator('a[href^="/products/"]')
    .evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  assert.equal(productLinks.length, 10);
  for (const href of productLinks) {
    assert.equal((await page.request.get(base + href)).status(), 200, href);
  }
  await page.getByRole("button", { name: "Tape-Ins", exact: true }).click();
  assert.match(await page.getByRole("status").innerText(), /^3 pieces/);
  await page
    .getByRole("searchbox", { name: "Find your shade" })
    .fill("not a shade");
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator('a[href^="/products/"]').count(), 10);
  await page.getByLabel("Sort by").selectOption("low");
  await page.locator("main img").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        image.loading = "eager";
        return image.decode();
      }),
    );
  });
  await page.screenshot({ path: output + "/shop-desktop.png", fullPage: true });
  await page.goto(base + "/products/genius-weft-espresso-balayage");
  await page
    .getByRole("button", { name: "Increase quantity", exact: true })
    .click();
  await page.getByRole("button", { name: "Add to bag" }).click();
  await page.getByRole("link", { name: "View bag", exact: false }).click();
  await page.waitForURL("**/cart");
  await page.getByRole("heading", { name: "Bag summary" }).waitFor();
  assert.match(await page.locator("main").innerText(), /\$536/);
  await page.reload();
  assert.match(await page.locator("main").innerText(), /Espresso Balayage/);
  const second = await page.context().newPage();
  await second.goto(base + "/cart");
  await second.getByRole("heading", { name: "Bag summary" }).waitFor();
  await page
    .getByRole("button", { name: "Increase Espresso Balayage quantity" })
    .click();
  assert.match(await page.locator("main").innerText(), /\$804/);
  await second.waitForFunction(() =>
    document.querySelector("main").innerText.includes("$804"),
  );
  await second.close();
  await page.getByRole("link", { name: "Review your selection" }).click();
  await page.waitForURL("**/checkout");
  assert.match(
    await page.locator("main").innerText(),
    /no order has been placed/,
  );
  await page.getByRole("link", { name: "Edit your bag" }).click();
  await page.waitForURL("**/cart");
  await page
    .getByRole("button", { name: "Remove Genius Weft Espresso Balayage" })
    .click();
  assert.match(
    await page.locator("main").innerText(),
    /Your next favourite is waiting/,
  );
  await page.getByRole("button", { name: "Toggle search" }).click();
  await page
    .getByRole("searchbox", { name: "Search products" })
    .fill("Vanilla");
  await page.getByRole("searchbox", { name: "Search products" }).press("Enter");
  await page.waitForURL("**/search?q=Vanilla");
  assert.match(await page.getByRole("status").innerText(), /^1 piece/);
  await page.goto(base + "/contact");
  await page.getByLabel("Your name").fill("Preview");
  await page
    .locator("main")
    .getByLabel("Email address")
    .fill("preview@example.com");
  await page.getByLabel("Your message").fill("Preview form check.");
  await page.getByRole("button", { name: "Preview message" }).click();
  assert.match(
    await page.getByRole("status").innerText(),
    /nothing has been sent or saved/,
  );
  await page.goto(base + "/about");
  await page.screenshot({
    path: output + "/about-desktop.png",
    fullPage: true,
  });
  for (const width of [375, 390, 430, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/shop",
      "/collections",
      "/collections/tape-ins",
      "/products/genius-weft-espresso-balayage",
      "/about",
      "/contact",
      "/cart",
      "/faq",
      "/shipping",
      "/account",
    ]) {
      await page.goto(base + route);
      const dimensions = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert.ok(
        dimensions.scroll <= dimensions.width,
        `${route} overflow at ${width}: ${dimensions.scroll}`,
      );
      if (
        width === 390 &&
        [
          "/shop",
          "/products/genius-weft-espresso-balayage",
          "/about",
          "/contact",
        ].includes(route)
      )
        await page.screenshot({
          path: output + "/" + route.replaceAll("/", "-") + "-mobile.png",
          fullPage: true,
        });
    }
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("dialog", { name: "Site menu" })
    .getByRole("link", { name: "Shop", exact: true })
    .click();
  await page.waitForURL("**/shop");
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  assert.deepEqual(errors, []);
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Storage.prototype.setItem = function () {
      throw new Error("Storage unavailable");
    };
  });
  const blockedPage = await blocked.newPage();
  await blockedPage.goto(base + "/products/clip-in-natural-black");
  await blockedPage.getByRole("button", { name: "Add to bag" }).click();
  await blockedPage
    .getByRole("link", { name: "View bag", exact: false })
    .click();
  await blockedPage.waitForURL("**/cart");
  await blockedPage.getByRole("heading", { name: "Bag summary" }).waitFor();
  assert.match(await blockedPage.locator("main").innerText(), /Natural Black/);
  await blocked.close();
  console.log(
    "PASS: routes, 10 product pages, 404s, search, filters, cart persistence, quantities, review, contact preview, mobile navigation and overflow checks at 375/390/430/768px.",
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
