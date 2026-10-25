/** Pure helpers for searching, filtering and sorting the catalogue. */

export function searchProducts(products, query) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.category,
      p.subcategory,
      p.gender,
      ...(p.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });
}

export function applyFilters(products, filters) {
  let list = searchProducts(products, filters.query || "");
  if (filters.subcategories?.length) {
    list = list.filter((p) => filters.subcategories.includes(p.subcategory));
  }
  if (filters.gender) {
    list = list.filter(
      (p) => p.gender === filters.gender || p.gender === "unisex"
    );
  }
  if (typeof filters.priceMin === "number") {
    list = list.filter((p) => p.price >= filters.priceMin);
  }
  if (typeof filters.priceMax === "number") {
    list = list.filter((p) => p.price <= filters.priceMax);
  }
  if (filters.sizes?.length) {
    list = list.filter((p) =>
      (p.sizes || []).some((s) => filters.sizes.includes(s))
    );
  }
  if (filters.minRating) {
    list = list.filter((p) => p.rating >= filters.minRating);
  }
  return list;
}

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function sortProducts(products, sort) {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "newest":
      return list.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || b.id.localeCompare(a.id)
      );
    case "popular":
      return list.sort((a, b) => b.reviewCount - a.reviewCount);
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    default:
      return list.sort(
        (a, b) =>
          Number(b.isBestSeller) - Number(a.isBestSeller) ||
          b.rating - a.rating
      );
  }
}

export function countActiveFilters(filters) {
  let n = 0;
  if (filters.query) n += 1;
  if (filters.subcategories?.length) n += filters.subcategories.length;
  if (filters.sizes?.length) n += filters.sizes.length;
  if (filters.minRating) n += 1;
  if (typeof filters.priceMin === "number" || typeof filters.priceMax === "number")
    n += 1;
  return n;
}