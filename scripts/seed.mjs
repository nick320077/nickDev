import pg from "pg";
import { readFile } from "node:fs/promises";
if (!process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL in .env.local");
const products = JSON.parse(
  await readFile(new URL("../src/lib/demo.json", import.meta.url), "utf8"),
);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  await client.query("BEGIN");
  await client.query(
    `CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, position INTEGER NOT NULL, data JSONB NOT NULL CHECK (data->>'id' = id AND (data->>'price')::numeric > 0));`,
  );
  for (const [position, product] of products.entries())
    await client.query(
      "INSERT INTO products (id,position,data) VALUES ($1,$2,$3) ON CONFLICT (id) DO UPDATE SET position=EXCLUDED.position,data=EXCLUDED.data",
      [product.id, position, JSON.stringify(product)],
    );
  await client.query("COMMIT");
  console.log(`Seeded ${products.length} demo products.`);
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  throw error;
} finally {
  await client.end();
}
