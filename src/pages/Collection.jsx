import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, SlidersHorizontal, PackageSearch, X } from "lucide-react";
import { products } from "../data/products";
import { COLLECTION_META } from "../data/categories";
import { applyFilters, sortProducts, SORT_OPTIONS, countActiveFilters } from "../utils/productFilters";
import ProductGrid from "../components/ProductGrid";
import ProductFilters from "../components/ProductFilters";
import NotFound from "./NotFound";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

function baseForSlug(slug) {
  switch (slug) {
    case "men": return products.filter((p) => p.category === "men");
    case "women": return products.filter((p) => p.category === "women");
    case "shoes": return products.filter((p) => p.category === "shoes");
    case "watches": return products.filter((p) => p.category === "watches");
    case "new-arrivals": return products.filter((p) => p.isNew);
    case "sale": return products.filter((p) => p.isOnSale);
    default: return null;
  }
}

const emptyFilters = (params) => ({
  query: "",
  subcategories: params.get("sub") ? [params.get("sub")] : [],
  sizes: [],
  gender: params.get("gender") || "",
  minRating: undefined,
  priceMin: undefined,
  priceMax: undefined,
});

export default function Collection() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const meta = COLLECTION_META[slug];
  const base = useMemo(() => baseForSlug(slug), [slug]);

  const [filters, setFilters] = useState(() => emptyFilters(searchParams));
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setFilters(emptyFilters(searchParams));
    setSort("featured");
    setMobileFilters(false);
  }, [slug, searchParams]);

  const facets = useMemo(() => {
    if (!base) return { subs: [], sizes: [], bounds: [0, 100000] };
    const subs = [...new Set(base.map((p) => p.subcategory))];
    const sizeSet = new Set(base.flatMap((p) => p.sizes || []));
    const sizes = [...sizeSet].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a);
      const bi = SIZE_ORDER.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return Number(a) - Number(b);
    });
    const prices = base.map((p) => p.price);
    const bounds = [
      Math.floor(Math.min(...prices) / 500) * 500,
      Math.ceil(Math.max(...prices) / 500) * 500,
    ];
    return { subs, sizes, bounds };
  }, [base]);

  const visible = useMemo(() => {
    if (!base) return [];
    return sortProducts(applyFilters(base, filters), sort);
  }, [base, filters, sort]);

  if (!meta || !base) return <NotFound />;

  const showGender = ["shoes", "watches", "new-arrivals", "sale"].includes(slug);
  const active = countActiveFilters(filters);
  const clear = () =>
    setFilters({ query: "", subcategories: [], sizes: [], gender: "", minRating: undefined, priceMin: undefined, priceMax: undefined });

  const filterPanel = (
    <ProductFilters
      filters={filters}
      onChange={setFilters}
      onClear={clear}
      subcategories={facets.subs}
      sizes={facets.sizes}
      priceBounds={facets.bounds}
      showGender={showGender}
    />
  );

  return (
    <div className="container-x py-10 lg:py-14">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-taupe">
        <Link to="/" className="hover:text-gold">Home</Link>
        <ChevronRight className="h-3 w-3" aria-hidden />
        <span className="text-ink">{meta.title}</span>
        {filters.gender && (
          <>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span className="text-gold">{filters.gender}</span>
          </>
        )}
      </nav>

      <header className="mb-10 max-w-2xl">
        <p className="eyebrow mb-3">ASY Sole Collection</p>
        <h1 className="heading-display text-5xl sm:text-6xl">{meta.title}</h1>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-ink/65">{meta.intro}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {/* desktop filters */}
        <aside className="hidden lg:block" aria-label="Product filters">
          <div className="sticky top-24 max-h-[calc(100dvh-120px)] overflow-y-auto lux-scroll pr-2">
            {filterPanel}
          </div>
        </aside>

        <div>
          {/* toolbar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-y border-ink/10 py-3">
            <p className="text-sm text-ink/60" aria-live="polite">
              <span className="font-semibold text-ink">{visible.length}</span>{" "}
              product{visible.length !== 1 ? "s" : ""}
              {active > 0 && <span className="text-gold"> · {active} filter{active !== 1 ? "s" : ""} active</span>}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilters(true)}
                className="inline-flex items-center gap-2 border border-ink/20 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] lg:hidden"
                aria-expanded={mobileFilters}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden />
                Filters{active > 0 ? ` (${active})` : ""}
              </button>
              <label className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-ink/60">
                <span className="hidden sm:inline">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="cursor-pointer border border-ink/20 bg-ivory px-3 py-2 text-[12px] uppercase tracking-[0.1em] text-ink focus:border-gold focus:outline-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <PackageSearch className="h-12 w-12 text-taupe" aria-hidden />
              <h2 className="font-display text-3xl">Nothing matches those filters</h2>
              <p className="max-w-sm text-sm font-light text-ink/60">
                Try widening the price range, removing a size, or clearing your filters to see the full edit.
              </p>
              <button type="button" onClick={clear} className="btn-ink mt-2">Clear All Filters</button>
            </div>
          ) : (
            <ProductGrid products={visible} columns={3} />
          )}
        </div>
      </div>

      {/* mobile filter sheet */}
      <AnimatePresence>
        {mobileFilters && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto lux-scroll bg-ivory p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                aria-label="Close filters"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
              {filterPanel}
              <button type="button" onClick={() => setMobileFilters(false)} className="btn-ink mt-8 w-full">
                Show {visible.length} Product{visible.length !== 1 ? "s" : ""}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}