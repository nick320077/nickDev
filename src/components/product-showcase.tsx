import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { type Product, money, categories } from "@/lib/catalog";
import { Purchase } from "./purchase";

const materialStories: Record<string, { line: string; detail: string }> = {
  mixes: {
    line: "Кожен простір починається з основи.",
    detail: "Для підготовки та оздоблення",
  },
  insulation: {
    line: "Тепло починається з матеріалу.",
    detail: "Для утеплення вашого простору",
  },
  drywall: {
    line: "Форма для ваших ідей.",
    detail: "Для стін і нових просторів",
  },
  paint: {
    line: "Останній штрих. Новий характер.",
    detail: "Для підготовки та оздоблення поверхонь",
  },
  tools: {
    line: "Точність у ваших руках.",
    detail: "Для роботи над вашим проєктом",
  },
  masonry: {
    line: "Матеріал, з якого починається дім.",
    detail: "Для мурування та будівництва",
  },
};
export function ProductShowcase({ product: p }: { product: Product }) {
  const category = categories.find((c) => c.id === p.category);
  const isBag = p.imageCell === 0;
  const story = materialStories[p.category] || {
    line: "Матеріал для вашої наступної ідеї.",
    detail: "Для будівництва та ремонту",
  };
  return (
    <section
      className={`material-showcase material-${p.category}`}
      aria-labelledby="material-title"
    >
      <div className="material-heading">
        <div>
          <span className="eyebrow muted">
            {category?.name} / {p.brand}
          </span>
          <h1 id="material-title">{p.name}</h1>
        </div>
        <p>{story.line}</p>
      </div>
      <div className="material-stage">
        <Image
          className="material-scene"
          src={
            isBag
              ? "/products/warehouse-bag.png"
              : "/products/warehouse-scene.png"
          }
          alt={
            isBag ? `${p.name} на п’єдесталі — художня демо-візуалізація` : ""
          }
          fill
          priority
          sizes="(max-width: 760px) 100vw, 1280px"
        />
        {!isBag && <div className="material-atmosphere" aria-hidden="true" />}
        {!isBag && (
          <div
            className="material-object"
            role="img"
            aria-label={p.name}
            style={{
              backgroundImage: "url(/products/material-cutouts.png)",
              backgroundPosition: `${(p.imageCell % 3) * 50}% ${Math.floor(p.imageCell / 3) * 50}%`,
            }}
          />
        )}
        <span className="material-scene-label">
          ОСНОВА / MATERIAL COLLECTION
        </span>
        <div className="material-order">
          <div className="material-order-top">
            <span className={p.inStock ? "stock" : "stock unavailable"}>
              {p.inStock ? "Є в наявності" : "Очікується"}
            </span>
            <span>{p.sku}</span>
          </div>
          <span className="material-brand">
            {p.brand}
            <small>{p.unit}</small>
          </span>
          <div className="material-price">
            {p.oldPrice && <del>{money(p.oldPrice)}</del>}
            <strong>{money(p.price)}</strong>
            <span>/ {p.unit}</span>
          </div>
          <Purchase product={p} />
          <p className="material-order-note">
            Демо-каталог. Замовлення та оплата поки недоступні.
          </p>
        </div>
        <span className="material-art-note">Художня демо-візуалізація</span>
      </div>
      <div className="material-caption">
        <div>
          <span className="material-caption-number">01 /</span>
          <span>
            {story.detail}
            <small>
              {p.specs["Фасування"]} · {p.brand}
            </small>
          </span>
        </div>
        <a href="#specifications">
          Деталі матеріалу <ArrowDown size={15} />
        </a>
      </div>
      <div className="material-editorial">
        <p>
          Обирайте матеріал.
          <br />
          <span>Створюйте свій простір.</span>
        </p>
        <Link href={`/catalog?category=${p.category}`}>
          Інші матеріали цієї категорії <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
