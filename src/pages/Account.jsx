import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Heart, ShoppingBag, Info } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Account() {
  const { count: wishCount } = useWishlist();
  const { count: cartCount } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="container-x grid gap-12 py-14 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="eyebrow mb-3">Your Space</p>
        <h1 className="heading-display text-5xl sm:text-6xl">Account</h1>
        <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-ink/65">
          Sign in to sync your bag and wishlist across devices. In this demo,
          authentication is illustrative — accounts require a backend service.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4">
          <Link to="/wishlist" className="group border border-ink/10 p-6 transition-colors hover:border-gold">
            <Heart className="h-6 w-6 text-gold" aria-hidden />
            <p className="mt-3 font-display text-3xl font-semibold">{wishCount}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-taupe group-hover:text-ink">Wishlist items</p>
          </Link>
          <Link to="/cart" className="group border border-ink/10 p-6 transition-colors hover:border-gold">
            <ShoppingBag className="h-6 w-6 text-gold" aria-hidden />
            <p className="mt-3 font-display text-3xl font-semibold">{cartCount}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-taupe group-hover:text-ink">Bag items</p>
          </Link>
        </div>
      </div>

      <div className="h-fit border border-ink/10 bg-taupe/10 p-8">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-gold">
          <User className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-3xl font-medium">Sign in</h2>
        {submitted ? (
          <p className="mt-4 flex items-start gap-3 border border-gold/40 bg-gold/10 p-4 text-sm font-light leading-relaxed" role="status">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            Thanks{email ? `, ${email}` : ""} — this is a frontend demo, so no account
            was created. Connect an authentication backend to enable real sign-in.
          </p>
        ) : (
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          >
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">Email</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" autoComplete="email" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">Password</span>
              <input type="password" required minLength={6} className="input-field" placeholder="••••••••" autoComplete="current-password" />
            </label>
            <button type="submit" className="btn-ink w-full">Continue</button>
            <p className="text-center text-[11px] font-light text-taupe">
              Demo only — credentials are never stored or sent anywhere.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}