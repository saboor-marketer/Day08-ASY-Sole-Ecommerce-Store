# ASY Sole — Premium Fashion E-commerce Frontend

A complete, functional React storefront for the fictional premium fashion brand
**ASY Sole** — men's & women's clothing, shoes and watches. Built as a
**frontend-only demo**: no backend, no API keys, no real payments.

## Run locally

```bash
npm install
npm run dev      # start dev server
npm run build    # production build (dist/)
npm run preview  # preview the build
```

## Stack

- React 19 (functional components + hooks) · Vite
- Tailwind CSS v4 (brand theme tokens)
- React Router (hash routing for static hosting)
- Framer Motion (subtle, reduced-motion-aware animation)
- Lucide React icons
- Context API + LocalStorage (cart, wishlist, newsletter preference)

## Brand system

Exactly two coordinated palettes:

| Palette | Colors |
|---|---|
| Midnight Black & Champagne Gold | `#111111` · `#C6A15B` |
| Ivory White & Warm Taupe | `#F8F6F1` · `#B7A99A` |

Typography: Cormorant Garamond (display) + Jost (body).
Currency: **PKR** by default — configurable in `src/utils/currency.js`.

## Features

- Mega-menu navigation, mobile drawer, announcement marquee
- Editorial hero, category cards, featured / new arrivals / best sellers
- Collection pages with search, subcategory / gender / price / size / rating
  filters, sorting, clear-all and empty states
- Product detail pages: gallery, variants, stock logic, specs, related items
- Quick View modal (focus trap, Escape to close)
- Cart drawer + cart page with stock-capped quantities and live totals
- Wishlist page with live nav counts
- Instant search overlay (name, category, tags)
- Frontend checkout preview: validated details → review → demo confirmation
- Newsletter with validation + persisted demo subscription state
- LocalStorage persistence for cart / wishlist / preferences
- Accessible focus states, semantic HTML, reduced-motion support

## Structure

```
src/
  components/   reusable UI (Navbar, ProductCard, CartDrawer, …)
  pages/        Home, Collection, ProductDetails, Cart, Checkout, …
  context/      CartContext, WishlistContext, UIContext
  data/         products.js (24 sample products), categories.js
  hooks/        useLocalStorage
  utils/        currency, productFilters
```

## Making it real

- Replace sample data in `src/data/products.js`
- Edit contact placeholders and social links in `src/components/Footer.jsx`
- Connect a backend + payment provider to enable real orders
- Photography: Pexels CDN (with graceful fallback images)