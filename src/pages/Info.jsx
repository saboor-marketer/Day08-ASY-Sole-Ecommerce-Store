import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NotFound from "./NotFound";

const TOPICS = {
  contact: {
    title: "Contact Us",
    body: [
      "This is a demo storefront, so contact channels are placeholders. Replace them with your real details in src/components/Footer.jsx.",
      "Email: [your-email@example.com] · Phone: [+00 000 0000000] · Studio: [Your address, City, Country].",
      "Once a backend is connected, this page can host a working contact form and live support channels.",
    ],
  },
  shipping: {
    title: "Shipping & Delivery",
    body: [
      "Delivery options, timelines and charges will be confirmed at checkout once a fulfilment partner is integrated.",
      "The shipping figure shown in the bag is a clearly-labelled demo estimate used to illustrate the order summary — it is not a real quote.",
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    body: [
      "ASY Sole is designed around a straightforward returns process: keep the packaging, retain your receipt, and start a return from your order.",
      "Specific return windows and conditions will be published here when the store goes live. This demo does not make binding delivery or return promises.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    body: [
      "Is this a real store? No — ASY Sole is a frontend demonstration. Products, prices and stock are sample data stored in your browser.",
      "Are payments processed? No. The checkout is a preview with validation and a review step only. No card details are collected.",
      "Where is my cart saved? In your browser's LocalStorage, so your bag and wishlist survive a page refresh on this device.",
      "What currency are prices in? Pakistani Rupees (PKR) by default. The currency is configurable in src/utils/currency.js.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "This demo stores your cart, wishlist and newsletter preference locally in your browser (LocalStorage). Nothing is transmitted to a server.",
      "Product photography is served from the Pexels CDN and fonts from Google Fonts; those providers may receive standard request metadata.",
      "A production privacy policy should be published here before launch.",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      "ASY Sole is a demonstration project. No products are actually sold, no orders are fulfilled, and no payments are taken.",
      "All product names, prices and availability are illustrative sample data.",
      "Replace this page with your legal terms before operating a live storefront.",
    ],
  },
};

export default function Info() {
  const { topic } = useParams();
  const content = TOPICS[topic];
  if (!content) return <NotFound />;

  return (
    <div className="container-x max-w-3xl py-12 lg:py-20">
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-taupe">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-ink">{content.title}</span>
      </nav>
      <p className="eyebrow mb-3">ASY Sole</p>
      <h1 className="heading-display text-5xl">{content.title}</h1>
      <div className="mt-8 space-y-5 border-t border-ink/10 pt-8">
        {content.body.map((p, i) => (
          <p key={i} className="text-[15px] font-light leading-relaxed text-ink/75">{p}</p>
        ))}
      </div>
      <Link to="/" className="btn-outline mt-10">Back to Home</Link>
    </div>
  );
}