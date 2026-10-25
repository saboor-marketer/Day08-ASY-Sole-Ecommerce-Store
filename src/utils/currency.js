/**
 * Central currency configuration. Change CURRENCY to switch storefront currency.
 */
export const CURRENCY = {
  code: "PKR",
  locale: "en-PK",
};

const formatter = new Intl.NumberFormat(CURRENCY.locale, {
  style: "currency",
  currency: CURRENCY.code,
  maximumFractionDigits: 0,
});

export function formatPrice(amount) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "—";
  return formatter.format(amount);
}

/** Flat demo shipping estimate — clearly labelled in the UI, not a real quote. */
export const DEMO_SHIPPING_FLAT = 250;

export function discountPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}