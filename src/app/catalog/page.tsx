import Link from "next/link";
import type { Metadata } from "next";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { categories, filterProducts, productCount } from "@/lib/catalog";
import { getProducts } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
export const metadata: Metadata = { title: "Каталог матеріалів" };
export const dynamic = "force-dynamic";
export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const value = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string) : "";
  const products = await getProducts();
  const category = value("category"),
    q = value("q"),
    brand = value("brand"),
    sort = value("sort"),
    max = value("maxPrice"),
    stock = value("stock") === "on";
  const maxPrice =
    max.trim() !== "" && Number.isFinite(Number(max)) && Number(max) >= 0
      ? Number(max)
      : undefined;
  const found = filterProducts(products, {
    category,
    q,
    brand,
    sort,
    maxPrice,
    stock,
  });
  return (
    <main id="main" className="container page">
      <div className="breadcrumbs">
        <Link href="/">Головна</Link>
        <span>/</span>Каталог
      </div>
      <div className="page-heading">
        <div>
          <span className="eyebrow muted">МАТЕРІАЛИ ДЛЯ ВАШИХ ІДЕЙ</span>
          <h1>
            {categories.find((c) => c.id === category)?.name ||
              "Каталог матеріалів"}
          </h1>
        </div>
        <span>{productCount(found.length)}</span>
      </div>
      <div className="catalog-layout">
        <aside>
          <form action="/catalog" className="filters">
            <h2>
              <SlidersHorizontal size={18} /> Фільтри
            </h2>
            <label>
              Пошук
              <div className="filter-search">
                <Search size={16} />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Назва або артикул"
                />
              </div>
            </label>
            <label>
              Категорія
              <select name="category" defaultValue={category}>
                <option value="">Усі категорії</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Бренд
              <select name="brand" defaultValue={brand}>
                <option value="">Усі бренди</option>
                {Array.from(new Set(products.map((p) => p.brand))).map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Максимальна ціна, ₴
              <input
                name="maxPrice"
                type="number"
                min="0"
                defaultValue={max}
                placeholder="Без обмеження"
              />
            </label>
            <label>
              Сортування
              <select name="sort" defaultValue={sort}>
                <option value="">Рекомендовані</option>
                <option value="price-asc">Від дешевих до дорогих</option>
                <option value="price-desc">Від дорогих до дешевих</option>
                <option value="name">За назвою</option>
              </select>
            </label>
            <label className="checkbox">
              <input type="checkbox" name="stock" defaultChecked={stock} />{" "}
              Тільки в наявності
            </label>
            <button className="button primary">
              Застосувати <ArrowRight size={17} />
            </button>
            <Link href="/catalog" className="reset">
              Скинути фільтри
            </Link>
          </form>
        </aside>
        <section aria-label="Товари">
          {q && <p className="search-summary">Результати пошуку «{q}»</p>}
          {found.length ? (
            <div className="product-grid catalog-products">
              {found.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <Search size={36} />
              <h2>Товарів не знайдено</h2>
              <p>Спробуйте іншу назву або змініть фільтри.</p>
              <Link className="button primary" href="/catalog">
                Показати всі товари
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
