import Link from "next/link";
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
import { categories, productCount } from "@/lib/catalog";
import { getProducts } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
export const dynamic = "force-dynamic";
const icons = [Layers, Grid2X2, PanelsTopLeft, PaintBucket, Hammer, BrickWall];
export default async function Home() {
  const products = await getProducts();
  return (
    <main id="main" className="container home">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span /> ДЛЯ ТИХ, ХТО БУДУЄ
          </span>
          <h1>
            Великі ідеї.
            <br />
            Міцна <em>основа.</em>
          </h1>
          <p>
            Від першої цеглини до останнього штриха.
            <br />
            Усе для будівництва та ремонту — в одному місці.
          </p>
          <Link className="button primary" href="/catalog">
            Обрати матеріали <ArrowUpRight size={19} />
          </Link>
          <div className="hero-caption">
            <span>01 /</span> Матеріали, з яких починається дім
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-grid" />
          <div className="arch arch-back" />
          <div className="arch arch-front" />
          <div className="art-step step-one" />
          <div className="art-step step-two" />
          <div className="art-step step-three" />
          <div className="art-block" />
          <div className="art-label">
            BUILD SOMETHING
            <br />
            <b>THAT LASTS.</b>
          </div>
          <span className="art-number">О / 01</span>
        </div>
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
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow muted">ВИБІР ДЛЯ ВАШОГО РЕМОНТУ</span>
            <h2>Почніть із найнеобхіднішого</h2>
          </div>
          <Link href="/catalog" className="text-link">
            До каталогу <ArrowRight size={18} />
          </Link>
        </div>
        <div className="product-grid">
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
