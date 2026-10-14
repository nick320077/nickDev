import { test, expect } from "@playwright/test";
import { Client } from "pg";
test("renders catalog data read from PostgreSQL", async ({
  page,
}, testInfo) => {
  test.skip(
    !process.env.DATABASE_URL || testInfo.project.name !== "desktop",
    "Requires PostgreSQL; run once to avoid concurrent fixture updates",
  );
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const { rows } = await client.query("SELECT data FROM products WHERE id=$1", [
    "brick",
  ]);
  const original = rows[0].data;
  try {
    const marker = "Цегла — PostgreSQL integration test";
    await client.query("UPDATE products SET data=$1::jsonb WHERE id=$2", [
      JSON.stringify({ ...original, name: marker }),
      "brick",
    ]);
    await page.goto("/products/brick");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(marker);
  } finally {
    await client.query("UPDATE products SET data=$1::jsonb WHERE id=$2", [
      JSON.stringify(original),
      "brick",
    ]);
    await client.end();
  }
});
