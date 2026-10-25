import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";
import { Modal, SmartImage, Stars, QtyPicker } from "./ui";
import WishlistButton from "./WishlistButton";
import { formatPrice } from "../utils/currency";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";

function QuickViewContent({ product, onClose }) {
  const { addItem } = useCart();
  const { showToast, setCartOpen } = useUI();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(product.colors?.[0]?.name || null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    setSize(null);
    setColor(product.colors?.[0]?.name || null);
    setQty(1);
    setError("");
  }, [product]);

  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    if (product.sizes?.length && !size) {
      setError("Please select a size to continue.");
      return;
    }
    const res = addItem(product, { size, color, qty });
    if (!res.ok) {
      setError(res.message);
      return;
    }
    showToast(res.message);
    onClose();
    setCartOpen(true);
  };

  return (
    <div className="grid sm:grid-cols-2">
      <div className="relative aspect-[3/4] bg-taupe/15 sm:aspect-auto sm:min-h-[520px]">
        <SmartImage src={product.images[0]} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
        {product.isOnSale && (
          <span className="absolute left-4 top-4 bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Sale</span>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <div>
          <p className="eyebrow mb-2">{product.subcategory}</p>
          <h2 id="quickview-title" className="font-display text-3xl font-medium leading-tight">
            {product.name}
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs text-ink/60">
            <Stars rating={product.rating} />
            <span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
          </div>
        </div>

        <p className="flex items-baseline gap-3">
          <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-taupe line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </p>

        <p className="text-sm font-light leading-relaxed text-ink/70 line-clamp-3">
          {product.description}
        </p>

        {product.colors?.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em]">
              Colour: <span className="text-gold">{color}</span>
            </legend>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={`Colour ${c.name}`}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-8 w-8 rounded-full border-2 transition-all ${color === c.name ? "border-gold scale-110" : "border-ink/15"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </fieldset>
        )}

        {product.sizes?.length > 0 && (
          <fieldset>
            <legend className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em]">
              Size {size && <span className="text-gold">· {size}</span>}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const unavailable = product.unavailableSizes?.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={unavailable}
                    aria-pressed={size === s}
                    onClick={() => { setSize(s); setError(""); }}
                    className={`min-w-11 border px-3 py-2 text-sm transition-colors ${
                      size === s
                        ? "border-ink bg-ink text-ivory"
                        : "border-ink/20 hover:border-ink"
                    } ${unavailable ? "cursor-not-allowed border-ink/10 text-taupe line-through" : ""}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {error && (
          <p className="flex items-center gap-2 text-sm font-medium text-ink" role="alert">
            <AlertCircle className="h-4 w-4 text-gold" aria-hidden /> {error}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {!outOfStock && <QtyPicker value={qty} onChange={setQty} max={product.stock} />}
          <button type="button" onClick={handleAdd} disabled={outOfStock} className="btn-ink flex-1 whitespace-nowrap">
            <ShoppingBag className="h-4 w-4" aria-hidden />
            {outOfStock ? "Out of Stock" : "Add to Bag"}
          </button>
          <WishlistButton product={product} className="border border-ink/20" size="h-5 w-5" />
        </div>
        {!outOfStock && product.stock <= 8 && (
          <p className="text-xs text-gold">Only {product.stock} left in stock.</p>
        )}

        <Link to={`/product/${product.slug}`} onClick={onClose} className="link-underline w-fit text-ink hover:text-gold">
          View Full Details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useUI();
  return (
    <AnimatePresence>
      {quickViewProduct && (
        <Modal onClose={closeQuickView} labelledBy="quickview-title" wide>
          <QuickViewContent product={quickViewProduct} onClose={closeQuickView} />
        </Modal>
      )}
    </AnimatePresence>
  );
}