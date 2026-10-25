import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X, ArrowRight, SearchX } from "lucide-react";
import { products } from "../data/products";
import { searchProducts } from "../utils/productFilters";
import { formatPrice } from "../utils/currency";
import { SmartImage, Stars } from "./ui";
import { useUI } from "../context/UIContext";

const POPULAR = ["Sneakers", "Dresses", "Watches", "Leather", "Cashmere", "Blazer"];
const CATEGORY_CHIPS = [
  { label: "Men", to: "/collection/men" },
  { label: "Women", to: "/collection/women" },
  { label: "Shoes", to: "/collection/shoes" },
  { label: "Watches", to: "/collection/watches" },
];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const reduce = useReducedMotion();

  const results = useMemo(
    () => (query.trim() ? searchProducts(products, query).slice(0, 8) : []),
    [query]
  );

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => inputRef.current?.focus(), 80);
      const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
      document.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(t);
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [searchOpen, setSearchOpen]);

  const close = () => setSearchOpen(false);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[75]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div className="absolute inset-0 bg-ink/70" onClick={close} aria-hidden />
          <motion.div
            className="relative max-h-[90dvh] overflow-y-auto lux-scroll bg-ivory"
            initial={reduce ? false : { y: -32 }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: -32 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-x py-8 sm:py-12">
              <div className="flex items-center gap-4 border-b-2 border-ink pb-4">
                <Search className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories, tags…"
                  aria-label="Search products"
                  className="w-full bg-transparent font-display text-2xl sm:text-3xl outline-none placeholder:text-taupe"
                />
                {query && (
                  <button type="button" onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="text-[11px] font-medium uppercase tracking-[0.18em] text-taupe hover:text-ink">
                    Clear
                  </button>
                )}
                <button type="button" onClick={close} aria-label="Close search" className="grid h-10 w-10 shrink-0 place-items-center transition-colors hover:text-gold">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!query.trim() ? (
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-4">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR.map((tag) => (
                        <button key={tag} type="button" onClick={() => setQuery(tag)} className="border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-gold hover:bg-gold/10">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow mb-4">Browse Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_CHIPS.map((c) => (
                        <Link key={c.label} to={c.to} onClick={close} className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-gold hover:bg-gold/10">
                          {c.label} <ArrowRight className="h-3 w-3 text-gold" aria-hidden />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-center">
                  <SearchX className="h-10 w-10 text-taupe" aria-hidden />
                  <p className="font-display text-2xl">No results for “{query}”</p>
                  <p className="max-w-sm text-sm text-ink/60">
                    Try a different term — for example “leather”, “dress” or “chronograph”.
                  </p>
                </div>
              ) : (
                <div className="mt-8">
                  <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-taupe">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.slug}`}
                          onClick={close}
                          className="group flex items-center gap-4 border-b border-ink/10 py-3 transition-colors hover:bg-taupe/10"
                        >
                          <SmartImage src={p.images[0]} alt={p.name} className="h-16 w-13 shrink-0 object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium group-hover:text-gold">{p.name}</span>
                            <span className="mt-0.5 flex items-center gap-2 text-xs text-ink/55">
                              <Stars rating={p.rating} className="h-3 w-3" /> {p.subcategory}
                            </span>
                          </span>
                          <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}