import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronDown, ShoppingBag, AlertCircle, Truck, RefreshCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import { formatPrice, discountPercent } from "../utils/currency";
import { SmartImage, Stars, QtyPicker, Reveal, SectionHeading } from "../components/ui";
import WishlistButton from "../components/WishlistButton";
import ProductGrid from "../components/ProductGrid";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import NotFound from "./NotFound";

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-[12px] font-semibold uppercase tracking-[0.2em]"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && <div className="pb-5 text-sm font-light leading-relaxed text-ink/70">{children}</div>}
    </div>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const { addItem } = useCart();
  const { showToast, setCartOpen } = useUI();

  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setImageIndex(0);
    setSize(null);
    setColor(product?.colors?.[0]?.name || null);
    setQty(1);
    setError("");
    setAdded(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [product]);

  if (!product) return <NotFound />;

  const outOfStock = product.stock <= 0;
  const discount = discountPercent(product.price, product.originalPrice);
  const related = getRelatedProducts(product, 4);

  const handleAdd = () => {
    if (product.sizes?.length && !size) {
      setError("Please select a size before adding to your bag.");
      return;
    }
    const res = addItem(product, { size, color, qty });
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setError("");
    setAdded(true);
    showToast(res.message);
    setCartOpen(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="container-x py-10 lg:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-taupe">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <Link to={`/collection/${product.category}`} className="hover:text-gold capitalize">
          {product.category === "men" ? "Men" : product.category === "women" ? "Women" : product.category}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-taupe/15">
            <SmartImage
              src={product.images[imageIndex]}
              alt={`${product.name} — view ${imageIndex + 1}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {product.isOnSale && discount > 0 && (
                <span className="bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Sale −{discount}%</span>
              )}
              {product.isNew && (
                <span className="bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">New</span>
              )}
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3" role="group" aria-label="Product image thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={imageIndex === i}
                  className={`w-20 overflow-hidden border-2 transition-colors ${imageIndex === i ? "border-gold" : "border-transparent hover:border-taupe"}`}
                >
                  <SmartImage src={img} alt="" className="aspect-[3/4] w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <div className="lg:py-4">
          <p className="eyebrow mb-3">{product.subcategory} · {product.gender === "unisex" ? "Unisex" : product.gender === "men" ? "For Men" : "For Women"}</p>
          <h1 className="heading-display text-4xl sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-ink/60">
            <Stars rating={product.rating} className="h-4 w-4" />
            <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
            <span aria-hidden>·</span>
            <span>{product.reviewCount} reviews</span>
          </div>

          <p className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold tracking-wide">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-taupe line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </p>

          {/* stock */}
          <p className="mt-4 inline-flex items-center gap-2 text-sm" role="status">
            <span className={`h-2 w-2 rounded-full ${outOfStock ? "bg-taupe" : product.stock <= 8 ? "bg-gold" : "bg-ink"}`} aria-hidden />
            {outOfStock ? (
              <span className="text-ink/60">Out of stock — save it to your wishlist for later.</span>
            ) : product.stock <= 8 ? (
              <span className="font-medium text-gold">Low stock — only {product.stock} left.</span>
            ) : (
              <span className="text-ink/70">In stock and ready to ship.</span>
            )}
          </p>

          <p className="mt-6 text-[15px] font-light leading-relaxed text-ink/75">
            {product.description}
          </p>

          {/* colors */}
          {product.colors?.length > 0 && (
            <fieldset className="mt-8">
              <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
                Colour — <span className="text-gold">{color}</span>
              </legend>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    aria-label={`Select colour ${c.name}`}
                    aria-pressed={color === c.name}
                    onClick={() => setColor(c.name)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${color === c.name ? "scale-110 border-gold" : "border-ink/15 hover:border-taupe"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {/* sizes */}
          {product.sizes?.length > 0 && (
            <fieldset className="mt-8">
              <legend className="mb-3 flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
                <span>Select size {size && <span className="text-gold">— {size}</span>}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const unavailable = product.unavailableSizes?.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={unavailable || outOfStock}
                      aria-pressed={size === s}
                      title={unavailable ? `${s} — unavailable` : `Size ${s}`}
                      onClick={() => { setSize(s); setError(""); }}
                      className={`min-w-13 border px-4 py-3 text-sm font-medium transition-colors ${
                        size === s ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink"
                      } ${unavailable || outOfStock ? "cursor-not-allowed border-ink/10 text-taupe line-through" : ""}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {product.unavailableSizes?.length > 0 && (
                <p className="mt-2 text-xs text-taupe">Struck-through sizes are currently unavailable.</p>
              )}
            </fieldset>
          )}

          {error && (
            <p role="alert" className="mt-5 flex items-center gap-2 border border-gold/50 bg-gold/10 px-4 py-3 text-sm font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-gold" aria-hidden /> {error}
            </p>
          )}

          {/* actions */}
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            {!outOfStock && (
              <div className="flex items-center">
                <QtyPicker value={qty} onChange={setQty} max={product.stock} />
              </div>
            )}
            <button type="button" onClick={handleAdd} disabled={outOfStock} className={`btn flex-1 whitespace-nowrap ${added ? "bg-gold text-ink" : "bg-ink text-ivory hover:bg-gold hover:text-ink"}`}>
              {added ? (
                <><CheckCircle2 className="h-4 w-4" aria-hidden /> Added to Bag</>
              ) : (
                <><ShoppingBag className="h-4 w-4" aria-hidden /> {outOfStock ? "Out of Stock" : "Add to Bag"}</>
              )}
            </button>
            <WishlistButton product={product} className="h-auto w-13 border border-ink/20" size="h-5 w-5" />
          </div>

          {/* reassurance */}
          <ul className="mt-8 grid gap-3 border-y border-ink/10 py-5 text-[13px] font-light text-ink/70 sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 shrink-0 text-gold" aria-hidden /> Delivery options at checkout</li>
            <li className="flex items-center gap-2"><RefreshCcw className="h-4 w-4 shrink-0 text-gold" aria-hidden /> Simple returns process</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden /> Secure demo checkout</li>
          </ul>

          <div className="mt-4">
            <Accordion title="Product Specifications" defaultOpen>
              <dl className="grid grid-cols-[140px_1fr] gap-y-2">
                {Object.entries(product.specs || {}).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-taupe">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-taupe">SKU</dt>
                <dd>ASY-{product.id.toUpperCase()}</dd>
              </dl>
            </Accordion>
            <Accordion title="Delivery & Returns">
              <p>
                Delivery timelines and charges are confirmed at checkout once a
                fulfilment partner is connected. Returns follow our standard
                process — see <Link to="/info/returns" className="text-gold underline underline-offset-2">Returns & Exchanges</Link> for
                details. This storefront is a demo; no live delivery promises are made.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* related */}
      <section className="mt-24" aria-label="Related products">
        <Reveal>
          <SectionHeading eyebrow="Complete the Look" title="You May Also Like" />
        </Reveal>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}