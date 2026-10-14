"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { type Product } from "@/lib/catalog";
import { useCart } from "./cart-provider";
export function AddToCart({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { add, ready } = useCart();
  return (
    <button
      type="button"
      disabled={!product.inStock || !ready}
      className={compact ? "add-compact" : "button primary"}
      aria-label={`Додати ${product.name} до кошика`}
      onClick={() => add(product.id)}
    >
      {compact ? (
        <Plus size={21} />
      ) : (
        <>
          <ShoppingBag size={18} />
          Додати до кошика
        </>
      )}
    </button>
  );
}
export function Purchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add, ready } = useCart();
  return (
    <div className="purchase">
      <div className="quantity">
        <button
          aria-label="Зменшити кількість"
          disabled={quantity === 1}
          onClick={() => setQuantity((n) => n - 1)}
        >
          <Minus size={16} />
        </button>
        <output aria-label="Кількість">{quantity}</output>
        <button
          aria-label="Збільшити кількість"
          disabled={quantity === 99}
          onClick={() => setQuantity((n) => n + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        className="button primary"
        disabled={!product.inStock || !ready}
        onClick={() => add(product.id, quantity)}
      >
        <ShoppingBag size={18} />
        Додати до кошика
      </button>
    </div>
  );
}
