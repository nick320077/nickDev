import type { Product } from "@/lib/catalog";
export function ProductPhoto({
  product,
  image,
}: {
  product: Product;
  image?: string;
}) {
  const cell = product.imageCell;
  return (
    <div
      role="img"
      aria-label={product.name}
      className="product-photo"
      style={{
        backgroundImage: `url(${image || product.image})`,
        backgroundPosition: `${(cell % 3) * 50}% ${Math.floor(cell / 3) * 50}%`,
      }}
    />
  );
}
