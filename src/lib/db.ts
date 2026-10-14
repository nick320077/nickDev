import "server-only";
import { Pool } from "pg";
import { demoProducts, type Product } from "./catalog";
const globalDb = globalThis as typeof globalThis & { storePool?: Pool };
export async function getProducts(): Promise<Product[]> {
  if (!process.env.DATABASE_URL) return demoProducts;
  const pool = (globalDb.storePool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 5000,
  }));
  const { rows } = await pool.query<{ data: Product }>(
    "SELECT data FROM products ORDER BY position, id",
  );
  return rows.map((row) => row.data);
}
