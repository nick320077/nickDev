import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container page empty">
      <span className="eyebrow muted">404</span>
      <h1>Сторінку не знайдено</h1>
      <p>Матеріал міг зникнути з каталогу або адреса змінилася.</p>
      <Link href="/catalog" className="button primary">
        Відкрити каталог
      </Link>
    </main>
  );
}
