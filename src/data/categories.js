const px = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const EDITORIAL = {
  hero: px(9255735, 1600, 2000),
  heroWide: px(9255735, 2000, 1400),
  promo: px(20381280, 1400, 1750),
  promoWide: px(8346923, 1800, 1100),
  newArrivals: px(4651342, 1200, 1500),
  story: px(40280298, 1200, 1500),
};

export const CATEGORY_CARDS = [
  {
    key: "men",
    title: "Men's Clothing",
    subtitle: "Tailoring, knitwear & refined essentials",
    image: px(4651433, 1000, 1300),
    to: "/collection/men",
  },
  {
    key: "women",
    title: "Women's Clothing",
    subtitle: "Dresses, cashmere & statement pieces",
    image: px(32628115, 1000, 1300),
    to: "/collection/women",
  },
  {
    key: "shoes",
    title: "Shoes",
    subtitle: "Sneakers, heels & boots for every step",
    image: px(13536939, 1000, 1300),
    to: "/collection/shoes",
  },
  {
    key: "watches",
    title: "Watches",
    subtitle: "Precision timepieces, quietly luxurious",
    image: px(10436602, 1000, 1300),
    to: "/collection/watches",
  },
];

export const COLLECTION_META = {
  men: {
    title: "Men's Clothing",
    intro:
      "Sharp tailoring, elevated essentials and outerwear built to last — the foundations of a modern men's wardrobe.",
  },
  women: {
    title: "Women's Clothing",
    intro:
      "From liquid satin gowns to cloud-soft cashmere — pieces designed to move with you, season after season.",
  },
  shoes: {
    title: "Shoes",
    intro:
      "Minimal sneakers, sculpted heels and rich leather boots. Considered footwear for men and women.",
  },
  watches: {
    title: "Watches",
    intro:
      "Chronographs, dress watches and mechanical art — precision timepieces with quiet presence.",
  },
  "new-arrivals": {
    title: "New Arrivals",
    intro:
      "The latest additions to the ASY Sole collection — fresh silhouettes, fabrics and finishes.",
  },
  sale: {
    title: "Sale",
    intro:
      "A curated selection of signature pieces at exceptional prices. While stock lasts.",
  },
};

export const MEGA_MENUS = {
  Men: [
    { label: "All Men's Clothing", to: "/collection/men" },
    { label: "Blazers & Suits", to: "/collection/men?sub=Blazers%20%26%20Suits" },
    { label: "Shirts", to: "/collection/men?sub=Shirts" },
    { label: "Knitwear", to: "/collection/men?sub=Knitwear" },
    { label: "Jackets & Coats", to: "/collection/men?sub=Jackets%20%26%20Coats" },
    { label: "Trousers", to: "/collection/men?sub=Trousers" },
    { label: "Men's Shoes", to: "/collection/shoes?gender=men" },
    { label: "Men's Watches", to: "/collection/watches?gender=men" },
  ],
  Women: [
    { label: "All Women's Clothing", to: "/collection/women" },
    { label: "Dresses", to: "/collection/women?sub=Dresses" },
    { label: "Knitwear", to: "/collection/women?sub=Knitwear" },
    { label: "Women's Shoes", to: "/collection/shoes?gender=women" },
    { label: "Women's Watches", to: "/collection/watches?gender=women" },
    { label: "New for Her", to: "/collection/new-arrivals?gender=women" },
  ],
};