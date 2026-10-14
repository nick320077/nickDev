import { describe, expect, it } from "vitest";
import {
  categories,
  demoProducts,
  filterProducts,
} from "../../src/lib/catalog";
describe("catalog", () => {
  it("searches names, brands and SKUs ignoring case and whitespace", () => {
    expect(
      filterProducts(demoProducts, { q: "  ГІПСОВА  " }).map((p) => p.id),
    ).toEqual(["plaster-30"]);
    expect(filterProducts(demoProducts, { q: "os-1001" })[0].id).toBe(
      "plaster-30",
    );
    expect(
      filterProducts(demoProducts, { q: "base" }).every(
        (p) => p.brand === "BASE",
      ),
    ).toBe(true);
  });
  it("combines category, brand, price and stock filters", () => {
    expect(
      filterProducts(demoProducts, {
        category: "mixes",
        brand: "BASE",
        maxPrice: 300,
        stock: true,
      }).map((p) => p.id),
    ).toEqual(["plaster-30"]);
    expect(filterProducts(demoProducts, { maxPrice: 0 })).toEqual([]);
    expect(
      filterProducts(demoProducts, { category: "masonry", stock: true }).map(
        (p) => p.id,
      ),
    ).toEqual(["block-100"]);
  });
  it("sorts without changing source and handles no results", () => {
    const source = demoProducts.map((p) => p.id);
    const asc = filterProducts(demoProducts, { sort: "price-asc" });
    expect(asc.map((p) => p.price)).toEqual(
      asc.map((p) => p.price).toSorted((a, b) => a - b),
    );
    expect(filterProducts(demoProducts, { sort: "price-desc" })[0].price).toBe(
      1290,
    );
    expect(demoProducts.map((p) => p.id)).toEqual(source);
    expect(filterProducts(demoProducts, { q: "nothing-found" })).toEqual([]);
  });
  it("has unique slugs, valid categories and positive prices", () => {
    expect(new Set(demoProducts.map((p) => p.slug)).size).toBe(
      demoProducts.length,
    );
    for (const p of demoProducts) {
      expect(categories.some((c) => c.id === p.category)).toBe(true);
      expect(p.price).toBeGreaterThan(0);
    }
  });
});
