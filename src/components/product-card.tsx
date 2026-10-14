import { ProductPhoto } from "@/components/product-photo";
import Link from "next/link";
import { type Product, money } from "@/lib/catalog";
import { AddToCart } from "./purchase";
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${p.slug}`} className="product-image">
        {p.oldPrice && <span className="badge">Вигідна ціна</span>}
        <ProductPhoto product={p} />
        <span className="image-note">Демо-зображення</span>
      </Link>
      <div className="product-body">
        <span className={p.inStock ? "stock" : "stock unavailable"}>
          {p.inStock ? "Є в наявності" : "Очікується"}
        </span>
        <Link className="product-name" href={`/products/${p.slug}`}>
          {p.name}
        </Link>
        <span className="product-unit">
          За {p.unit} · {p.brand}
        </span>
        <div className="product-bottom">
          <div>
            {p.oldPrice && <del>{money(p.oldPrice)}</del>}
            <strong>{money(p.price)}</strong>
          </div>
          <AddToCart product={p} compact />
        </div>
      </div>
    </article>
  );
}
