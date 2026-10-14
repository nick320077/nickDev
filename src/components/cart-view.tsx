"use client";
import { ProductPhoto } from "@/components/product-photo";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { useCart } from "./cart-provider";
export function CartView({ products }: { products: Product[] }) {
  const { items, ready, setQuantity } = useCart();
  if (!ready) return <p role="status">Завантаження кошика…</p>;
  if (!items.length)
    return (
      <div className="empty">
        <ShoppingBag size={44} />
        <h2>Тут починається ваш проєкт</h2>
        <p>Додайте потрібні матеріали — ми збережемо їх у кошику.</p>
        <Link className="button primary" href="/catalog">
          Перейти до каталогу <ArrowRight size={18} />
        </Link>
      </div>
    );
  const lines = items.map((item) => ({
    item,
    product: products.find((p) => p.id === item.id),
  }));
  const total = lines.reduce(
    (sum, { item, product }) =>
      sum + (product?.inStock ? product.price * item.quantity : 0),
    0,
  );
  return (
    <div className="cart-layout">
      <section aria-label="Товари в кошику">
        <div className="cart-list">
          {lines.map(({ item, product: p }) => (
            <article className="cart-row" key={item.id}>
              {p ? (
                <>
                  <Link href={`/products/${p.slug}`} className="cart-photo">
                    <ProductPhoto product={p} />
                  </Link>
                  <div className="cart-product">
                    <Link href={`/products/${p.slug}`}>{p.name}</Link>
                    <small>
                      {money(p.price)} / {p.unit}
                    </small>
                    {!p.inStock && (
                      <span className="unavailable">
                        Товар недоступний і не врахований у сумі
                      </span>
                    )}
                    <div className="quantity">
                      <button
                        aria-label={`Зменшити кількість ${p.name}`}
                        disabled={item.quantity === 1}
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={15} />
                      </button>
                      <input
                        aria-label={`Кількість ${p.name}`}
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) => {
                          const n = Number(e.target.value);
                          if (n >= 1) setQuantity(item.id, n);
                        }}
                      />
                      <button
                        aria-label={`Збільшити кількість ${p.name}`}
                        disabled={item.quantity === 99}
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                  <strong>
                    {money(p.inStock ? p.price * item.quantity : 0)}
                  </strong>
                </>
              ) : (
                <p>Цей товар більше недоступний у каталозі.</p>
              )}
              <button
                className="remove"
                aria-label={`Видалити ${p?.name || "товар"}`}
                onClick={() => setQuantity(item.id, 0)}
              >
                <Trash2 size={19} />
              </button>
            </article>
          ))}
        </div>
        <Link className="text-link continue" href="/catalog">
          ← Продовжити покупки
        </Link>
      </section>
      <aside className="cart-summary">
        <h2>Ваш проєкт у цифрах</h2>
        <div>
          <span>Кількість матеріалів</span>
          <b>{items.reduce((n, i) => n + i.quantity, 0)}</b>
        </div>
        <div>
          <span>Вартість товарів</span>
          <b>{money(total)}</b>
        </div>
        <div>
          <span>Доставка</span>
          <span>Не розраховується</span>
        </div>
        <div className="cart-total">
          <strong>Разом</strong>
          <strong>{money(total)}</strong>
        </div>
        <p className="demo-note">
          Це демонстраційний кошик. Оформлення замовлення та оплата з’являться
          на наступному етапі.
        </p>
      </aside>
    </div>
  );
}
