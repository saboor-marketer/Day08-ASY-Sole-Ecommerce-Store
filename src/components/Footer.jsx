import { Link } from "react-router-dom";
import { Camera, ThumbsUp, AtSign, SquarePlay, MapPin, Mail, Phone } from "lucide-react";

/**
 * Configurable social destinations — replace with the brand's real profiles.
 * They intentionally point to platform homepages in this demo.
 */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com", Icon: Camera },
  { label: "Facebook", href: "https://www.facebook.com", Icon: ThumbsUp },
  { label: "X (Twitter)", href: "https://www.twitter.com", Icon: AtSign },
  { label: "YouTube", href: "https://www.youtube.com", Icon: SquarePlay },
];

const SHOP_LINKS = [
  { label: "Men's Clothing", to: "/collection/men" },
  { label: "Women's Clothing", to: "/collection/women" },
  { label: "Shoes", to: "/collection/shoes" },
  { label: "Watches", to: "/collection/watches" },
  { label: "New Arrivals", to: "/collection/new-arrivals" },
  { label: "Sale", to: "/collection/sale" },
];

const SERVICE_LINKS = [
  { label: "Contact Us", to: "/info/contact" },
  { label: "Shipping & Delivery", to: "/info/shipping" },
  { label: "Returns & Exchanges", to: "/info/returns" },
  { label: "FAQs", to: "/info/faq" },
  { label: "Privacy Policy", to: "/info/privacy" },
  { label: "Terms of Service", to: "/info/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/25 bg-ink text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl font-semibold tracking-[0.22em]">
            ASY<span className="mx-1 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" aria-hidden />SOLE
          </p>
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ivory/60">
            Premium, contemporary fashion and lifestyle. Timeless essentials and
            modern statement pieces — clothing, footwear and timepieces, curated
            with intent.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`ASY Sole on ${label} (opens in a new tab)`}
                title={`${label} — configure in Footer.jsx`}
                className="grid h-10 w-10 place-items-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Shop">
          <h3 className="eyebrow mb-5">Shop</h3>
          <ul className="space-y-2.5">
            {SHOP_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm font-light text-ivory/65 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Customer service">
          <h3 className="eyebrow mb-5">Customer Service</h3>
          <ul className="space-y-2.5">
            {SERVICE_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm font-light text-ivory/65 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-5">Contact</h3>
          <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-gold/80">
            Placeholders — edit in Footer.jsx
          </p>
          <ul className="space-y-3 text-sm font-light text-ivory/65">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>[Your studio address]<br />[City, Country]</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>[your-email@example.com]</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>[+00 000 0000000]</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[12px] font-light text-ivory/45 sm:flex-row">
          <p>© {new Date().getFullYear()} ASY Sole. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link to="/info/privacy" className="hover:text-gold">Privacy Policy</Link>
            <span className="text-gold" aria-hidden>✦</span>
            <Link to="/info/terms" className="hover:text-gold">Terms</Link>
            <span className="text-gold" aria-hidden>✦</span>
            <span>Frontend demo — no real orders</span>
          </p>
        </div>
      </div>
    </footer>
  );
}