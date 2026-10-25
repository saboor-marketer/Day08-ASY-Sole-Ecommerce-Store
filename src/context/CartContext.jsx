import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

export const lineKey = (id, size, color) =>
  `${id}::${size || "-"}::${color || "-"}`;

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("asy-cart-v1", []);

  /** returns { ok, message } so callers can show feedback */
  const addItem = useCallback(
    (product, { size = null, color = null, qty = 1 } = {}) => {
      if (!product) return { ok: false, message: "Product unavailable." };
      if (product.stock <= 0)
        return { ok: false, message: "This item is out of stock." };
      if (product.sizes?.length && !size)
        return { ok: false, message: "Please select a size first." };
      const amount = Math.max(1, Math.floor(Number(qty) || 1));
      const key = lineKey(product.id, size, color);
      const existing = items.find((i) => i.key === key);
      const current = existing ? existing.qty : 0;
      const nextQty = Math.min(current + amount, product.stock);
      const capped = nextQty < current + amount;
      setItems((prev) => {
        const found = prev.find((i) => i.key === key);
        if (found) {
          return prev.map((i) =>
            i.key === key
              ? { ...i, qty: Math.min(i.qty + amount, product.stock) }
              : i
          );
        }
        return [
          ...prev,
          { key, productId: product.id, size, color, qty: nextQty },
        ];
      });
      return {
        ok: true,
        capped,
        message: capped
          ? `Only ${product.stock} in stock — quantity adjusted.`
          : "Added to your bag.",
      };
    },
    [items, setItems]
  );

  const updateQty = useCallback(
    (key, qty) => {
      setItems((prev) =>
        prev
          .map((i) => {
            if (i.key !== key) return i;
            const product = getProductById(i.productId);
            const max = product ? product.stock : 99;
            const next = Math.min(Math.max(1, Math.floor(qty) || 1), max);
            return { ...i, qty: next };
          })
          .filter((i) => i.qty > 0)
      );
    },
    [setItems]
  );

  const removeItem = useCallback(
    (key) => setItems((prev) => prev.filter((i) => i.key !== key)),
    [setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const { lines, count, subtotal } = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: getProductById(i.productId) }))
      .filter((i) => i.product);
    const count = lines.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = lines.reduce((sum, i) => sum + i.qty * i.product.price, 0);
    return { lines, count, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({ lines, count, subtotal, addItem, updateQty, removeItem, clearCart }),
    [lines, count, subtotal, addItem, updateQty, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}