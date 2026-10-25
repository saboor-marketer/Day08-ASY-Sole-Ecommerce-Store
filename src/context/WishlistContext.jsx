import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getProductById } from "../data/products";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage("asy-wishlist-v1", []);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id) => {
      const added = !ids.includes(id);
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      return added;
    },
    [ids, setIds]
  );

  const remove = useCallback(
    (id) => setIds((prev) => prev.filter((x) => x !== id)),
    [setIds]
  );

  const items = useMemo(
    () => ids.map((id) => getProductById(id)).filter(Boolean),
    [ids]
  );

  const value = useMemo(
    () => ({ ids, items, count: items.length, has, toggle, remove }),
    [ids, items, has, toggle, remove]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}