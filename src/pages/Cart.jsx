import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, DEMO_SHIPPING_FLAT } from "../utils/currency";
import { SmartImage, QtyPicker, Reveal } from "../components/ui";

export default function Cart() {
  const { lines, count, subtotal, updateQty, removeItem, clearCart } = useCart();
  const total = subtotal + (lines.length ? DEMO_SHIPPING_FLAT : 0);

  return (
    <div className="container-x py-10 lg:py-16">
      <header className="mb-12">
        <p className="eyebrow mb-3">Almost Yours</p>
        <h1 className="heading-display text-5xl sm:text-6xl">Shopping Bag</h1>
        <p className="mt-4 text-[15px] font-light text-ink/65">
          {count > 0 ? `${count} item${count !== 1 ? "s" : ""} in your bag.` : "Your bag is waiting to be filled."}
        </p>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-dashed border-taupe/60 py-24 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-taupe/15">
            <ShoppingBag className="h-8 w-8 text-taupe" aria-hidden />
          </span>
          <h2 className="font-display text-3xl">Your bag is empty</h2>
          <p className="max-w-sm text-sm font-light text-ink/60">
            Explore the collection and add something worth keeping.
          </p>
          <Link to="/collection/new-arrivals" className="btn-ink mt-2">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="hidden border-b border-ink/10 pb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe sm:grid sm:grid-cols-[1fr_130px_110px_40px]">
              <span>Product</span><span>Quantity</span><span className="text-right">Total</span><span />
            </div>
            <ul className="divide-y divide-ink/10">
              {lines.map((line) => (
                <li key={line.key} className="grid gap-4 py-6 sm:grid-cols-[1fr_130px_110px_40px] sm:items-center">
                  <div className="flex gap-4">
                    <Link to={`/product/${line.product.slug}`} className="shrink-0 overflow-hidden">
                      <SmartImage src={line.product.images[0]} alt={line.product.name} className="h-32 w-24 object-cover transition-transform duration-500 hover:scale-105" />
                    </Link>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-taupe">{line.product.subcategory}</p>
                      <Link to={`/product/${line.product.slug}`} className="mt-1 block font-medium leading-snug hover:text-gold">
                        {line.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink/55">
                        {line.size && <>Size {line.size}</>}
                        {line.size && line.color && " · "}
                        {line.color}
                      </p>
                      <p className="mt-2 text-sm text-ink/70">{formatPrice(line.product.price)} each</p>
                      {line.qty >= line.product.stock && (
                        <p className="mt-1 text-xs text-gold">Maximum available quantity reached.</p>
                      )}
                    </div>
                  </div>
                  <QtyPicker value={line.qty} onChange={(q) => updateQty(line.key, q)} max={line.product.stock} small />
                  <p className="text-right font-semibold sm:text-base">{formatPrice(line.qty * line.product.price)}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(line.key)}
                    aria-label={`Remove ${line.product.name}`}
                    className="justify-self-start text-taupe transition-colors hover:text-ink sm:justify-self-end"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Link to="/collection/new-arrivals" className="link-underline text-ink hover:text-gold">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Continue Shopping
              </Link>
              <button type="button" onClick={clearCart} className="text-[11px] font-medium uppercase tracking-[0.18em] text-taupe hover:text-ink">
                Clear bag
              </button>
            </div>
          </div>

          <Reveal>
            <aside className="h-fit border border-ink/10 bg-taupe/10 p-7 lg:sticky lg:top-28" aria-label="Order summary">
              <h2 className="font-display text-2xl font-medium">Order Summary</h2>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Subtotal ({count} items)</dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/60">
                    Shipping <span className="block text-[10px] uppercase tracking-wider text-gold">Demo estimate — final at checkout</span>
                  </dt>
                  <dd>{formatPrice(DEMO_SHIPPING_FLAT)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink/15 pt-3 text-lg">
                  <dt className="font-medium">Total</dt>
                  <dd className="font-semibold">{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link to="/checkout" className="btn-ink mt-6 w-full">
                Proceed to Checkout <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="mt-4 text-center text-[11px] font-light text-taupe">
                Frontend demo — no payment is collected and no real order is placed.
              </p>
            </aside>
          </Reveal>
        </div>
      )}
    </div>
  );
}