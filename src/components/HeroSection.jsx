import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SmartImage } from "./ui";
import { EDITORIAL } from "../data/categories";

const VALUES = ["Premium Fabrics", "Contemporary Design", "Considered Craft", "Timeless Essentials", "Accessible Luxury"];

export default function HeroSection() {
  const reduce = useReducedMotion();
  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative overflow-hidden bg-ivory" aria-label="Introduction">
      {/* oversized ghost word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 top-8 select-none font-display text-[26vw] font-semibold leading-none tracking-tight text-taupe/15 lg:text-[19vw]"
      >
        ASY
      </span>

      <div className="container-x relative grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <motion.p {...fadeUp(0.05)} className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-gold" aria-hidden />
            The New Season · ASY Sole Collection
          </motion.p>
          <motion.h1
            {...fadeUp(0.15)}
            className="heading-display text-[17vw] leading-[0.95] sm:text-7xl lg:text-[6.2rem]"
          >
            STYLE THAT
            <br />
            <em className="font-normal italic text-gold">SPEAKS.</em>
          </motion.h1>
          <motion.p {...fadeUp(0.28)} className="mt-7 max-w-md text-[15px] font-light leading-relaxed text-ink/70">
            Discover timeless essentials and modern statement pieces for every
            occasion — clothing, footwear and timepieces, curated with intent.
          </motion.p>
          <motion.div {...fadeUp(0.4)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/collection/new-arrivals" className="btn-ink group">
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link to="/collection/new-arrivals" className="link-underline text-ink hover:text-gold">
              Explore New Arrivals <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.52)} className="mt-14 flex items-center gap-8 border-t border-ink/10 pt-6">
            <div>
              <p className="font-display text-3xl font-semibold">4</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">Curated Edits</p>
            </div>
            <div className="h-8 w-px bg-ink/10" aria-hidden />
            <div>
              <p className="font-display text-3xl font-semibold">PKR</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">Local Pricing</p>
            </div>
            <div className="h-8 w-px bg-ink/10" aria-hidden />
            <div>
              <p className="font-display text-3xl font-semibold">100%</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">Considered Pieces</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <SmartImage
              src={EDITORIAL.hero}
              alt="Fashion editorial — a couple styled in neutral-toned ASY Sole pieces"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden bg-ink px-6 py-5 text-ivory sm:block">
            <p className="eyebrow mb-1">Editorial № 01</p>
            <p className="font-display text-xl italic">The Quiet Statement</p>
          </div>
          <span className="absolute -right-3 -top-3 -z-0 hidden h-full w-full border border-gold/50 lg:block" aria-hidden />
        </motion.div>
      </div>

      {/* values marquee */}
      <div className="overflow-hidden border-y border-ink/10 bg-ink py-3.5 text-ivory">
        <div className="flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex" aria-hidden={rep === 1}>
              {VALUES.map((v) => (
                <span key={v} className="mx-7 flex items-center gap-7 text-[11px] font-light uppercase tracking-[0.3em]">
                  {v} <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}