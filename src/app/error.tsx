"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container page empty">
      <h1>Не вдалося завантажити магазин</h1>
      <p>
        Спробуйте ще раз. Якщо проблема повторюється, перевірте підключення до
        бази даних.
      </p>
      <button className="button primary" onClick={reset}>
        Спробувати ще раз
      </button>
    </main>
  );
}
