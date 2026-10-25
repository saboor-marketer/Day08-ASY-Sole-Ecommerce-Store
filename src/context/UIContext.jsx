import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const showToast = useCallback((message, tone = "success") => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const openQuickView = useCallback((product) => {
    setCartOpen(false);
    setSearchOpen(false);
    setQuickViewProduct(product);
  }, []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  const value = useMemo(
    () => ({
      searchOpen,
      setSearchOpen,
      cartOpen,
      setCartOpen,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      toasts,
      showToast,
    }),
    [searchOpen, cartOpen, quickViewProduct, openQuickView, closeQuickView, toasts, showToast]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}