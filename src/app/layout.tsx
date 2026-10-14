import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "ОСНОВА — матеріали для ваших ідей",
    template: "%s | ОСНОВА",
  },
  description:
    "Будівельні матеріали для ремонту та будівництва. Демонстраційний інтернет-магазин.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <CartProvider>
          <a href="#main" className="skip-link">
            До основного вмісту
          </a>
          <Header />
          {children}
          <footer>
            <div className="container footer-grid">
              <div>
                <Link href="/" className="brand">
                  ОСНОВА.
                </Link>
                <p>Надійна основа для великих ідей.</p>
              </div>
              <div>
                <strong>Матеріали для вашого простору</strong>
                <Link href="/catalog">Каталог матеріалів</Link>
                <Link href="/cart">Ваш кошик</Link>
              </div>
              <div>
                <strong>Перша версія магазину</strong>
                <p>
                  Демонстраційні товари та ціни.
                  <br />
                  Оплата та приймання замовлень не підключені.
                </p>
              </div>
            </div>
            <div className="container footer-bottom">
              © {new Date().getFullYear()} ОСНОВА{" "}
              <span>Будуємо майбутнє разом.</span>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
