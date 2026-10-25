import { Search, RotateCcw, Star } from "lucide-react";
import { formatPrice } from "../utils/currency";
import { countActiveFilters } from "../utils/productFilters";

function Section({ title, children }) {
  return (
    <fieldset className="border-b border-ink/10 pb-6">
      <legend className="mb-4 pt-6 text-[11px] font-semibold uppercase tracking-[0.22em]">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export default function ProductFilters({
  filters,
  onChange,
  onClear,
  subcategories = [],
  sizes = [],
  priceBounds = [0, 100000],
  showGender = false,
}) {
  const active = countActiveFilters(filters);
  const set = (patch) => onChange({ ...filters, ...patch });

  const toggleIn = (list, value) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="text-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium">Filters</h2>
        {active > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-gold hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Clear all ({active})
          </button>
        )}
      </div>

      <Section title="Search within collection">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" aria-hidden />
          <input
            type="search"
            value={filters.query || ""}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Search these products…"
            aria-label="Search within this collection"
            className="input-field pl-10"
          />
        </div>
      </Section>

      {showGender && (
        <Section title="Gender">
          <div className="flex flex-wrap gap-2">
            {["", "men", "women"].map((g) => (
              <button
                key={g || "all"}
                type="button"
                aria-pressed={(filters.gender || "") === g}
                onClick={() => set({ gender: g })}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                  (filters.gender || "") === g
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 hover:border-ink"
                }`}
              >
                {g === "" ? "All" : g}
              </button>
            ))}
          </div>
        </Section>
      )}

      {subcategories.length > 1 && (
        <Section title="Category">
          <ul className="space-y-2.5">
            {subcategories.map((sub) => {
              const checked = filters.subcategories?.includes(sub);
              return (
                <li key={sub}>
                  <label className="flex cursor-pointer items-center gap-3 text-ink/75 hover:text-ink">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        set({ subcategories: toggleIn(filters.subcategories || [], sub) })
                      }
                      className="h-4 w-4 accent-[#111111]"
                    />
                    {sub}
                  </label>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <Section title="Price range">
        <div className="flex items-center gap-3">
          <label className="flex-1">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-taupe">Min</span>
            <input
              type="number"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={filters.priceMin ?? ""}
              placeholder={String(priceBounds[0])}
              onChange={(e) =>
                set({ priceMin: e.target.value === "" ? undefined : Number(e.target.value) })
              }
              className="input-field px-3 py-2.5"
            />
          </label>
          <span className="mt-5 text-taupe" aria-hidden>—</span>
          <label className="flex-1">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-taupe">Max</span>
            <input
              type="number"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={filters.priceMax ?? ""}
              placeholder={String(priceBounds[1])}
              onChange={(e) =>
                set({ priceMax: e.target.value === "" ? undefined : Number(e.target.value) })
              }
              className="input-field px-3 py-2.5"
            />
          </label>
        </div>
        <input
          type="range"
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={500}
          value={filters.priceMax ?? priceBounds[1]}
          onChange={(e) => set({ priceMax: Number(e.target.value) })}
          aria-label="Maximum price"
          className="mt-4 w-full accent-[#C6A15B]"
        />
        <p className="mt-1 text-xs text-taupe">
          Up to {formatPrice(filters.priceMax ?? priceBounds[1])}
        </p>
      </Section>

      {sizes.length > 0 && (
        <Section title="Size">
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const on = filters.sizes?.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set({ sizes: toggleIn(filters.sizes || [], s) })}
                  className={`min-w-10 border px-2.5 py-2 text-xs transition-colors ${
                    on ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </Section>
      )}

      <Section title="Rating">
        <div className="space-y-2">
          {[4.5, 4, 0].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-3 text-ink/75 hover:text-ink">
              <input
                type="radio"
                name="min-rating"
                checked={(filters.minRating || 0) === r}
                onChange={() => set({ minRating: r || undefined })}
                className="h-4 w-4 accent-[#111111]"
              />
              {r === 0 ? (
                "Any rating"
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" strokeWidth={0} aria-hidden />
                  {r}+ & up
                </span>
              )}
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}