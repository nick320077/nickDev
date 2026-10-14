import Link from "next/link";
import { CartView } from "@/components/cart-view";
import { getProducts } from "@/lib/db";
export const dynamic = "force-dynamic";
export const metadata = { title: "Кошик" };
export default async function Cart() {
  return (
    <main id="main" className="container page">
      <div className="breadcrumbs">
        <Link href="/">Головна</Link>
        <span>/</span>Кошик
      </div>
      <div className="page-heading">
        <div>
          <span className="eyebrow muted">УСЕ ДЛЯ ВАШОГО ПРОЄКТУ</span>
          <h1>Ваш кошик</h1>
        </div>
      </div>
      <CartView products={await getProducts()} />
    </main>
  );
}
