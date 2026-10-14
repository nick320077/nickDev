import { test, expect } from "@playwright/test";
test("home, search, filters, product, cart persistence and removal", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Великі ідеї/ }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Пошук товарів" }).fill("гіпсова");
  await page.getByRole("button", { name: "Шукати", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.locator(".product-name").click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Штукатурка",
  );
  await page
    .getByRole("button", { name: "Збільшити кількість", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Додати до кошика", exact: true })
    .click();
  await expect(page.locator(".toast[role=status]")).toHaveText(
    "Товар додано до кошика",
  );
  await page.getByRole("link", { name: /Кошик/, exact: false }).first().click();
  const quantity = page.getByRole("spinbutton", {
    name: /Кількість Штукатурка/,
  });
  await expect(quantity).toHaveValue("2");
  await quantity.fill("3");
  await expect(page.locator(".cart-total")).toContainText("867");
  await page.reload();
  await expect(quantity).toHaveValue("3");
  await page.getByRole("button", { name: /Видалити Штукатурка/ }).click();
  await expect(
    page.getByRole("heading", { name: "Тут починається ваш проєкт" }),
  ).toBeVisible();
  await page.goto("/catalog");
  await page
    .getByRole("combobox", { name: "Категорія", exact: true })
    .selectOption("mixes");
  await page
    .getByRole("combobox", { name: "Бренд", exact: true })
    .selectOption("BASE");
  await page.getByLabel("Максимальна ціна, ₴").fill("300");
  await page.getByRole("button", { name: /Застосувати/ }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Пошук", { exact: true }).fill("does-not-exist");
  await page.getByRole("button", { name: /Застосувати/ }).click();
  await expect(
    page.getByRole("heading", { name: "Товарів не знайдено" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("responsive layout, missing product and unavailable stock", async ({
  page,
}) => {
  for (const path of ["/", "/catalog", "/products/plaster-30", "/cart"]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/products/brick");
  await expect(
    page.getByRole("button", { name: "Додати до кошика", exact: true }),
  ).toBeDisabled();
  const response = await page.goto("/products/missing-material");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Сторінку не знайдено" }),
  ).toBeVisible();
});

test("product presentation works across all material categories", async ({
  page,
}) => {
  for (const slug of [
    "plaster-30",
    "mineral-wool",
    "drywall-12",
    "primer-10",
    "roller-250",
    "block-100",
  ]) {
    const response = await page.goto(`/products/${slug}`);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Додати до кошика", exact: true }),
    ).toBeEnabled();
    await page
      .getByRole("link", { name: "Деталі матеріалу", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Характеристики", exact: true }),
    ).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
