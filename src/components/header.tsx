"use client";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  ArrowUpRight,
  MapPin,
  Layers3,
} from "lucide-react";
import { useCart } from "./cart-provider";
export function Header() {
  const { items } = useCart();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>Ваш простір починається з якісних матеріалів</span>
          <span className="location">
            <MapPin size={13} /> Україна <span className="divider">/</span>{" "}
            Українська
          </span>
        </div>
      </div>
      <header>
        <div className="container header-main">
          <Link className="brand" href="/" aria-label="ОСНОВА — головна">
            <span className="brand-icon">
              <Layers3 />
            </span>
            ОСНОВА<span className="brand-dot">.</span>
          </Link>
          <form action="/catalog" className="search">
            <Search size={19} />
            <input
              name="q"
              aria-label="Пошук товарів"
              placeholder="Що потрібно для вашого проєкту?"
            />
            <button aria-label="Шукати">
              <ArrowUpRight size={20} />
            </button>
          </form>
          <Link href="/cart" className="cart-link">
            <ShoppingBag size={23} />
            <span>Кошик</span>
            <b aria-label={`${count} товарів у кошику`}>{count}</b>
          </Link>
        </div>
        <nav className="container navigation" aria-label="Основна навігація">
          <Link className="catalog-link" href="/catalog">
            <Layers3 size={17} />
            Каталог матеріалів
          </Link>
          <Link href="/catalog?category=mixes">Будівельні суміші</Link>
          <Link href="/catalog?category=insulation">Утеплювачі</Link>
          <Link href="/catalog?category=tools">Інструменти</Link>
          <Link href="/#about" className="nav-about">
            Про магазин <ArrowUpRight size={15} />
          </Link>
        </nav>
      </header>
    </>
  );
}
