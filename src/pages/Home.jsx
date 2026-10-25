import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ShieldCheck, RefreshCcw, Gem, Headset } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import ProductCard from "../components/ProductCard";
import { Reveal, SectionHeading, SmartImage } from "../components/ui";
import { CATEGORY_CARDS, EDITORIAL } from "../data/categories";
import { products } from "../data/products";

const FEATURED_IDS = ["m01", "w01", "s01", "t01", "w04", "m03", "s04", "t03", "w02", "m04", "s02", "t06"];

const BENEFITS = [
  { Icon: ShieldCheck, title: "Secure Checkout", text: "A safe, transparent checkout experience." },
  { Icon: RefreshCcw, title: "Easy Returns", text: "A straightforward returns process." },
  { Icon: Gem, title: "Quality Fashion", text: "Considered fabrics and refined finishing." },
  { Icon: Headset, title: "Customer Support", text: "Friendly help whenever you need it." },
];

export default function Home() {
  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 6);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <>
      <HeroSection />

      {/* ————— Shop by Category ————— */}
      <section className="container-x py-20 lg:py-28" aria-label="Shop by category">
        <Reveal>
          <SectionHeading
            eyebrow="Curated For You"
            title="Shop by Category"
            action={
              <Link to="/collection/new-arrivals" className="link-underline hidden text-ink hover:text-gold sm:inline-flex">
                View Everything <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            }
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {CATEGORY_CARDS.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— Featured Products ————— */}
      <section className="border-y border-ink/10 bg-ivory" aria-label="Featured products">
        <div className="container-x py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="The Selection"
              title="Featured Pieces"
              action={
                <p className="max-w-xs text-sm font-light text-ink/60">
                  Twelve pieces that define the season — across tailoring, dresses, footwear and time.
                </p>
              }
            />
          </Reveal>
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* ————— New Arrivals editorial ————— */}
      <section className="bg-ink text-ivory" aria-label="New arrivals">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[380px_1fr] lg:py-28">
          <Reveal className="flex flex-col">
            <p className="eyebrow mb-4">Just Landed</p>
            <h2 className="heading-display text-5xl">
              NEW
              <br />
              <em className="italic text-gold">ARRIVALS</em>
            </h2>
            <p className="mt-5 text-sm font-light leading-relaxed text-ivory/65">
              Fresh silhouettes, fabrics and finishes — the latest additions to
              the ASY Sole collection, styled for the season ahead.
            </p>
            <Link to="/collection/new-arrivals" className="btn-gold mt-8 w-fit">
              View All <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="relative mt-10 hidden flex-1 overflow-hidden lg:block">
              <SmartImage
                src={EDITORIAL.newArrivals}
                alt="Studio editorial of models in modern tailoring"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-ink/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-gold">
                Editorial № 02
              </span>
            </div>
          </Reveal>

          <div className="min-w-0">
            <div className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
              {newArrivals.map((p) => (
                <div key={p.id} className="w-[240px] shrink-0 snap-start sm:w-[270px]">
                  <div className="bg-ivory p-3 pb-4 text-ink">
                    <ProductCard product={p} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ivory/40 lg:hidden">
              Swipe to explore →
            </p>
          </div>
        </div>
      </section>

      {/* ————— Promotional banner ————— */}
      <section className="relative overflow-hidden" aria-label="Promotion">
        <div className="absolute inset-0">
          <SmartImage
            src={EDITORIAL.promoWide}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/60" aria-hidden />
        </div>
        <div className="container-x relative py-28 text-ivory lg:py-40">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">The ASY Sole Philosophy</p>
            <h2 className="heading-display text-5xl sm:text-6xl lg:text-7xl">
              YOUR STYLE.
              <br />
              <em className="italic text-gold">YOUR STATEMENT.</em>
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-ivory/80">
              From everyday essentials to standout accessories, discover pieces
              that define your look.
            </p>
            <Link to="/collection/new-arrivals" className="btn-ivory mt-9 group">
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ————— Best Sellers ————— */}
      <section className="container-x py-20 lg:py-28" aria-label="Best sellers">
        <Reveal>
          <SectionHeading
            eyebrow="Loved By You"
            title="Best Sellers"
            action={
              <Link to="/collection/sale" className="link-underline hidden text-ink hover:text-gold sm:inline-flex">
                Shop the Sale <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            }
          />
        </Reveal>
        <ProductGrid products={bestSellers} />
      </section>

      {/* ————— Benefits ————— */}
      <section className="border-t border-ink/10 bg-taupe/10" aria-label="Shopping benefits">
        <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-4">
          {BENEFITS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.07} className="flex flex-col items-start gap-3">
              <Icon className="h-7 w-7 text-ink" strokeWidth={1.2} aria-hidden />
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em]">{title}</h3>
                <p className="mt-1 text-[13px] font-light text-ink/60">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}