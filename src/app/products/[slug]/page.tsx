import { ProductPhoto } from "@/components/product-photo";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShieldCheck, Package, Truck } from "lucide-react";
import { categories, money } from "@/lib/catalog";
import { getProducts } from "@/lib/db";
import { Purchase } from "@/components/purchase";
import { ProductCard } from "@/components/product-card";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProducts()).find((p) => p.slug === slug);
  return { title: p?.name || "Товар не знайдено" };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts();
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const category = categories.find((c) => c.id === p.category)!;
  return (
    <main id="main" className="container page">
      <div className="breadcrumbs">
        <Link href="/">Головна</Link>
        <span>/</span>
        <Link href="/catalog">Каталог</Link>
        <span>/</span>
        <Link href={`/catalog?category=${p.category}`}>{category.name}</Link>
      </div>
      <div className="product-detail">
        <div className="detail-image">
          <ProductPhoto product={p} />
          <span className="image-note">
            Демонстраційне зображення матеріалу
          </span>
        </div>
        <section className="detail-info">
          <span className="eyebrow muted">
            {p.brand} / {category.name}
          </span>
          <h1>{p.name}</h1>
          <div className="detail-meta">
            <span className={p.inStock ? "stock" : "stock unavailable"}>
              {p.inStock ? "Є в наявності" : "Немає в наявності"}
            </span>
            <span>Артикул: {p.sku}</span>
          </div>
          <div className="detail-price">
            {p.oldPrice && <del>{money(p.oldPrice)}</del>}
            <strong>{money(p.price)}</strong>
            <span>/ {p.unit}</span>
          </div>
          <Purchase product={p} />
          <p className="demo-note">
            Демонстраційна ціна. Реальні замовлення та оплата поки недоступні.
          </p>
          <div className="detail-services">
            <div>
              <Package size={20} />
              <span>
                Зручно планувати покупки
                <small>Кошик зберігається у вашому браузері</small>
              </span>
            </div>
            <div>
              <Truck size={20} />
              <span>
                Доставка на наступному етапі
                <small>Зараз доступний перегляд і кошик</small>
              </span>
            </div>
            <div>
              <ShieldCheck size={20} />
              <span>
                Інформація під рукою<small>Опис і характеристики нижче</small>
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="product-description">
        <section>
          <h2>Про матеріал</h2>
          <p>{p.description}</p>
        </section>
        <section>
          <h2>Характеристики</h2>
          <dl>
            {Object.entries(p.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>Також для вашого проєкту</h2>
          <Link href="/catalog" className="text-link">
            Усі матеріали →
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((other) => other.id !== p.id && other.inStock)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </main>
  );
}
