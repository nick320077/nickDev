import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
  Grid2X2,
  PanelsTopLeft,
  PaintBucket,
  Hammer,
  BrickWall,
  PackageCheck,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { categories, productCount, money } from "@/lib/catalog";
import { getProducts } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
export const dynamic = "force-dynamic";
const icons = [Layers, Grid2X2, PanelsTopLeft, PaintBucket, Hammer, BrickWall];
export default async function Home() {
  const products = await getProducts();
  const featured = products.find((p) => p.id === "plaster-30") || products[0];
  return (
    <main id="main" className="container home">
      <section className="campaign" aria-label="Матеріал у центрі уваги">
        <Image
          src="/products/warehouse-bag.png"
          alt="Матеріал на п’єдесталі в просторі складу — художня демо-візуалізація"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 1280px"
          className="campaign-image"
        />
        <span className="campaign-edition">ОСНОВА / MATERIAL COLLECTION</span>
        <div className="campaign-copy">
          <span className="eyebrow muted">МАТЕРІАЛИ З ХАРАКТЕРОМ</span>
          <h1>
            Великі ідеї.
            <br />
            <em>Міцна основа.</em>
          </h1>
          <p>
            Знайомтеся з матеріалами,
            <br />з яких починається ваш простір.
          </p>
          <Link
            className="button primary"
            href={featured ? `/products/${featured.slug}` : "/catalog"}
          >
            Дивитися матеріал <ArrowUpRight size={18} />
          </Link>
          {featured && (
            <div className="campaign-product">
              <span>{featured.name}</span>
              <strong>
                {money(featured.price)} <small>/ {featured.unit}</small>
              </strong>
            </div>
          )}
        </div>
        <span className="campaign-art-note">Художня демо-візуалізація</span>
      </section>
      <div className="benefits">
        <div>
          <PackageCheck />
          <span>
            <strong>Усе для вашого проєкту</strong>
            <small>Від основи до оздоблення</small>
          </span>
        </div>
        <div>
          <Truck />
          <span>
            <strong>Зручно обирати</strong>
            <small>Каталог, пошук і чесні демо-ціни</small>
          </span>
        </div>
        <div>
          <ShieldCheck />
          <span>
            <strong>Продумані матеріали</strong>
            <small>Характеристики у кожній картці</small>
          </span>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow muted">КОЛЕКЦІЯ МАТЕРІАЛІВ</span>
            <h2>Кожен матеріал — окрема історія</h2>
          </div>
          <Link href="/catalog" className="text-link">
            До каталогу <ArrowRight size={18} />
          </Link>
        </div>
        <div className="product-grid home-gallery">
          {products
            .filter((p) =>
              [
                "plaster-30",
                "mineral-wool",
                "primer-10",
                "roller-250",
              ].includes(p.id),
            )
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow muted">ЗНАЙДІТЬ ПОТРІБНЕ</span>
            <h2>Будуємо від основи</h2>
          </div>
          <Link href="/catalog" className="text-link">
            Усі категорії <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={c.id}
                href={`/catalog?category=${c.id}`}
                className="category-card"
              >
                <span className="category-index">0{i + 1}</span>
                <Icon size={38} strokeWidth={1.3} />
                <div>
                  <strong>{c.name}</strong>
                  <ArrowUpRight size={19} />
                </div>
                <small>
                  {productCount(
                    products.filter((p) => p.category === c.id).length,
                  )}
                </small>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="about-banner" id="about">
        <div>
          <span className="eyebrow">МЕНШЕ ПОШУКІВ. БІЛЬШЕ МОЖЛИВОСТЕЙ.</span>
          <h2>
            Ваш наступний проєкт
            <br />
            починається тут.
          </h2>
          <p>
            ОСНОВА — магазин матеріалів для тих, хто створює свій простір.
            <br />
            Це демонстраційна версія: покупки та доставка поки недоступні.
          </p>
        </div>
        <Link href="/catalog" className="button light">
          Знайти матеріали <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
