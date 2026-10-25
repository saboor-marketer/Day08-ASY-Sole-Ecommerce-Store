import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag } from "lucide-react";
import { SmartImage, Stars } from "./ui";
import WishlistButton from "./WishlistButton";
import { formatPrice, discountPercent } from "../utils/currency";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { openQuickView, showToast, setCartOpen } = useUI();
  const [hovered, setHovered] = useState(false);

  const hasSizes = Boolean(product.sizes?.length);
  const outOfStock = product.stock <= 0;
  const discount = discountPercent(product.price, product.originalPrice);
  const secondary = product.images[1] || product.images[0];

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    if (hasSizes || product.colors?.length > 1) {
      // needs variant selection — open quick view
      openQuickView(product);
      return;
    }
    const res = addItem(product, { color: product.colors?.[0]?.name || null, qty: 1 });
    showToast(res.message, res.ok ? "success" : "info");
    if (res.ok) setCartOpen(true);
  };

  return (
    <article
      className="group relative flex h-full flex-col bg-ivory"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-taupe/15">
        <Link
          to={`/product/${product.slug}`}
          aria-label={product.name}
          className="block aspect-[3/4] overflow-hidden"
        >
          <SmartImage
            src={hovered && secondary ? secondary : product.images[0]}
            alt={product.name}
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] ${
              outOfStock ? "opacity-60 saturate-50" : ""
            }`}
          />
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {outOfStock && (
            <span className="bg-taupe px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              Out of Stock
            </span>
          )}
          {product.isOnSale && discount > 0 && (
            <span className="bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              Sale −{discount}%
            </span>
          )}
          {product.isNew && !outOfStock && (
            <span className="bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
              New
            </span>
          )}
        </div>

        <WishlistButton product={product} className="absolute right-3 top-3" />

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 gap-px opacity-100 transition-all duration-300 lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex flex-1 items-center justify-center gap-2 bg-ivory/95 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold"
          >
            <Eye className="h-4 w-4" aria-hidden /> Quick View
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            className="flex flex-1 items-center justify-center gap-2 bg-ink/95 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            {outOfStock ? "Sold Out" : hasSizes ? "Select Size" : "Add to Bag"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-taupe">
            {product.subcategory}
          </p>
          {product.colors?.length > 0 && (
            <span className="flex items-center gap-1" aria-label={`${product.colors.length} colours available`}>
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="h-2.5 w-2.5 rounded-full border border-ink/20"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </span>
          )}
        </div>
        <h3 className="font-body text-[15px] font-medium leading-snug">
          <Link
            to={`/product/${product.slug}`}
            className="transition-colors hover:text-gold"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-ink/60">
          <Stars rating={product.rating} />
          <span>{product.rating.toFixed(1)}</span>
          <span aria-hidden>·</span>
          <span>{product.reviewCount} reviews</span>
        </div>
        <p className="mt-auto pt-1 flex items-baseline gap-2">
          <span className="text-[15px] font-semibold tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-taupe line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

export default memo(ProductCard);