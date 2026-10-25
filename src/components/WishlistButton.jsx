import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useUI } from "../context/UIContext";

export default function WishlistButton({ product, className = "", size = "h-4.5 w-4.5" }) {
  const { has, toggle } = useWishlist();
  const { showToast } = useUI();
  const active = has(product.id);

  return (
    <button
      type="button"
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={active}
      title={active ? "Remove from wishlist" : "Save to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(product.id);
        showToast(added ? "Saved to your wishlist." : "Removed from wishlist.", added ? "success" : "info");
      }}
      className={`grid h-10 w-10 place-items-center transition-all duration-300 ${
        active ? "bg-ink text-gold" : "bg-ivory/90 text-ink hover:bg-gold hover:text-ink"
      } ${className}`}
    >
      <Heart className={size} fill={active ? "currentColor" : "none"} strokeWidth={1.6} />
    </button>
  );
}