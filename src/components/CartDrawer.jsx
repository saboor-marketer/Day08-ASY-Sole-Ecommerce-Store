import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { formatPrice, DEMO_SHIPPING_FLAT } from "../utils/currency";
import { SmartImage, QtyPicker } from "./ui";

export default function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { lines, count, subtotal, updateQty, removeItem } = useCart();
  const panelRef = useRef(null);
  const reduce = useReducedMotion();
  const close = () => setCartOpen(false);

  useEffect(() => {
    if (!cartOpen) return;
    const previous = document.activeElement;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartOpen]);

  const total = subtotal + (lines.length ? DEMO_SHIPPING_FLAT : 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-float"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-2xl font-medium">
                Your Bag <span className="text-base text-taupe">({count})</span>
              </h2>
              <button type="button" onClick={close} aria-label="Close bag" className="grid h-10 w-10 place-items-center transition-colors hover:text-gold">
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-taupe/15">
                  <ShoppingBag className="h-8 w-8 text-taupe" aria-hidden />
                </span>
                <p className="font-display text-2xl">Your bag is empty</p>
                <p className="text-sm font-light text-ink/60">
                  Considered pieces are waiting. Start with the new arrivals.
                </p>
                <Link to="/collection/new-arrivals" onClick={close} className="btn-ink mt-2">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto lux-scroll px-6">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4 py-5">
                      <Link to={`/product/${line.product.slug}`} onClick={close} className="shrink-0">
                        <SmartImage src={line.product.images[0]} alt={line.product.name} className="h-28 w-22 object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/product/${line.product.slug}`} onClick={close} className="text-sm font-medium leading-snug hover:text-gold">
                            {line.product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(line.key)}
                            aria-label={`Remove ${line.product.name} from bag`}
                            className="text-taupe transition-colors hover:text-ink"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-ink/55">
                          {line.size && <>Size {line.size}</>}
                          {line.size && line.color && " · "}
                          {line.color}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <QtyPicker small value={line.qty} onChange={(q) => updateQty(line.key, q)} max={line.product.stock} />
                          <span className="text-sm font-semibold">{formatPrice(line.qty * line.product.price)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-ink/10 px-6 py-5">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-ink/60">Subtotal</dt>
                      <dd className="font-medium">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink/60">Shipping <span className="text-[10px] uppercase tracking-wider text-gold">(demo estimate)</span></dt>
                      <dd>{formatPrice(DEMO_SHIPPING_FLAT)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
                      <dt className="font-medium">Total</dt>
                      <dd className="font-semibold">{formatPrice(total)}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 grid gap-2">
                    <Link to="/checkout" onClick={close} className="btn-gold w-full">
                      Proceed to Checkout <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Link to="/cart" onClick={close} className="btn-outline w-full px-3">View Bag</Link>
                      <button type="button" onClick={close} className="btn-outline w-full px-3">Continue</button>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[11px] font-light text-taupe">
                    Demo storefront — no real payments are processed.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}