import { ProductShowcase } from "@/components/product-showcase";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories } from "@/lib/catalog";
import { getProducts } from "@/lib/db";
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
      <ProductShowcase product={p} />
      <div className="product-description" id="specifications">
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
