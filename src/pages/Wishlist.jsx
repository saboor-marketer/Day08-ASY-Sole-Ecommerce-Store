import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { SmartImage, Stars, Reveal } from "../components/ui";
import { formatPrice } from "../utils/currency";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();
  const { openQuickView, showToast, setCartOpen } = useUI();

  const moveToBag = (p) => {
    if (p.stock <= 0) {
      showToast("This item is currently out of stock.", "info");
      return;
    }
    if (p.sizes?.length) {
      openQuickView(p);
      return;
    }
    const res = addItem(p, { color: p.colors?.[0]?.name || null, qty: 1 });
    showToast(res.message, res.ok ? "success" : "info");
    if (res.ok) setCartOpen(true);
  };

  return (
    <div className="container-x py-10 lg:py-16">
      <header className="mb-12 max-w-xl">
        <p className="eyebrow mb-3">Saved For Later</p>
        <h1 className="heading-display text-5xl sm:text-6xl">Your Wishlist</h1>
        <p className="mt-4 text-[15px] font-light text-ink/65">
          {items.length > 0
            ? `${items.length} piece${items.length !== 1 ? "s" : ""} you're keeping an eye on. Saved in this browser.`
            : "Tap the heart on any product to keep it close."}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-dashed border-taupe/60 py-24 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-taupe/15">
            <Heart className="h-8 w-8 text-taupe" aria-hidden />
          </span>
          <h2 className="font-display text-3xl">Nothing saved yet</h2>
          <p className="max-w-sm text-sm font-light text-ink/60">
            Browse the collection and save the pieces that speak to you.
          </p>
          <Link to="/collection/new-arrivals" className="btn-ink mt-2">Discover New Arrivals</Link>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={Math.min(i, 3) * 0.05} className="flex gap-5 border border-ink/10 bg-ivory p-4 shadow-card">
                <Link to={`/product/${p.slug}`} className="shrink-0 overflow-hidden">
                  <SmartImage src={p.images[0]} alt={p.name} className="h-40 w-30 object-cover transition-transform duration-500 hover:scale-105" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-taupe">{p.subcategory}</p>
                  <Link to={`/product/${p.slug}`} className="mt-1 font-medium leading-snug hover:text-gold">
                    {p.name}
                  </Link>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-ink/55">
                    <Stars rating={p.rating} className="h-3 w-3" /> {p.rating.toFixed(1)}
                  </div>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="font-semibold">{formatPrice(p.price)}</span>
                    {p.originalPrice && <span className="text-xs text-taupe line-through">{formatPrice(p.originalPrice)}</span>}
                  </p>
                  {p.stock <= 0 && <p className="mt-1 text-xs font-medium text-gold">Currently out of stock</p>}
                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <button type="button" onClick={() => moveToBag(p)} className="inline-flex flex-1 items-center justify-center gap-2 bg-ink px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-ink">
                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                      {p.sizes?.length ? "Select Size" : "Add to Bag"}
                    </button>
                    <button
                      type="button"
                      onClick={() => { remove(p.id); showToast("Removed from wishlist.", "info"); }}
                      aria-label={`Remove ${p.name} from wishlist`}
                      className="grid h-9.5 w-9.5 place-items-center border border-ink/15 text-taupe transition-colors hover:border-ink hover:text-ink"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}