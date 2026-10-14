"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { changeQuantity, parseCart, type CartItem } from "@/lib/cart";
const CartContext = createContext<{
  items: CartItem[];
  ready: boolean;
  setQuantity: (id: string, n: number) => void;
  add: (id: string, n?: number) => void;
  notice: string;
}>({
  items: [],
  ready: false,
  setQuantity: () => {},
  add: () => {},
  notice: "",
});
const empty: CartItem[] = [];
let cached: CartItem[] | undefined;
const listeners = new Set<() => void>();
function getSnapshot() {
  if (!cached) {
    try {
      cached = parseCart(localStorage.getItem("osnova-cart"));
    } catch {
      cached = [];
    }
  }
  return cached;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const sync = (event: StorageEvent) => {
    if (event.key === "osnova-cart" || event.key === null) {
      cached = parseCart(event.newValue);
      for (const notify of listeners) notify();
    }
  };
  window.addEventListener("storage", sync);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", sync);
  };
}
function update(items: CartItem[]) {
  cached = items;
  try {
    localStorage.setItem("osnova-cart", JSON.stringify(items));
  } catch {}
  for (const notify of listeners) notify();
}
const clientReady = () => true;
const serverReady = () => false;
const serverSnapshot = () => empty;
export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);
  const setQuantity = (id: string, n: number) =>
    update(changeQuantity(getSnapshot(), id, n));
  const add = (id: string, n = 1) => {
    const current = getSnapshot();
    update(
      changeQuantity(
        current,
        id,
        (current.find((i) => i.id === id)?.quantity || 0) + n,
      ),
    );
    setNotice("Товар додано до кошика");
  };
  return (
    <CartContext.Provider value={{ items, ready, setQuantity, add, notice }}>
      {children}
      <div role="status" className={notice ? "toast visible" : "toast"}>
        {notice}
      </div>
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
