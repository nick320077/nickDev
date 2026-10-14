export type CartItem = { id: string; quantity: number };
export const MAX_QUANTITY = 99;
export function parseCart(value: string | null): CartItem[] {
  try {
    const data: unknown = JSON.parse(value || "[]");
    if (!Array.isArray(data)) return [];
    const unique = new Map<string, number>();
    for (const item of data)
      if (
        item &&
        typeof item.id === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      )
        unique.set(item.id, Math.min(item.quantity, MAX_QUANTITY));
    return Array.from(unique, ([id, quantity]) => ({ id, quantity }));
  } catch {
    return [];
  }
}
export function changeQuantity(
  items: CartItem[],
  id: string,
  quantity: number,
): CartItem[] {
  if (!Number.isFinite(quantity)) return items;
  if (quantity <= 0) return items.filter((item) => item.id !== id);
  const safe = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));
  return items.some((item) => item.id === id)
    ? items.map((item) => (item.id === id ? { ...item, quantity: safe } : item))
    : [...items, { id, quantity: safe }];
}
