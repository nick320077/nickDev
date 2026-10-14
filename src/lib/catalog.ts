import demo from "./demo.json";
export type Product = (typeof demo)[number];
export const categories = [
  { id: "mixes", name: "Будівельні суміші", icon: "Layers" },
  { id: "insulation", name: "Утеплювачі", icon: "Grid2X2" },
  { id: "drywall", name: "Гіпсокартон", icon: "PanelsTopLeft" },
  { id: "paint", name: "Фарби та ґрунтівки", icon: "PaintBucket" },
  { id: "tools", name: "Інструменти", icon: "Hammer" },
  { id: "masonry", name: "Мурувальні матеріали", icon: "BrickWall" },
];
export const demoProducts: Product[] = demo;
export function filterProducts(
  products: Product[],
  options: {
    q?: string;
    category?: string;
    brand?: string;
    maxPrice?: number;
    stock?: boolean;
    sort?: string;
  },
) {
  const q = (options.q || "").trim().toLocaleLowerCase("uk");
  const result = products.filter(
    (p) =>
      (!q ||
        `${p.name} ${p.brand} ${p.sku}`.toLocaleLowerCase("uk").includes(q)) &&
      (!options.category || p.category === options.category) &&
      (!options.brand || p.brand === options.brand) &&
      (options.maxPrice === undefined || p.price <= options.maxPrice) &&
      (!options.stock || p.inStock),
  );
  return result.sort((a, b) =>
    options.sort === "price-asc"
      ? a.price - b.price
      : options.sort === "price-desc"
        ? b.price - a.price
        : options.sort === "name"
          ? a.name.localeCompare(b.name, "uk")
          : 0,
  );
}
export const money = (value: number) =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(value);

export function productCount(count: number) {
  const suffix =
    count % 100 >= 11 && count % 100 <= 14
      ? "товарів"
      : count % 10 === 1
        ? "товар"
        : count % 10 >= 2 && count % 10 <= 4
          ? "товари"
          : "товарів";
  return `${count} ${suffix}`;
}
