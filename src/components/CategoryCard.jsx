import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "./ui";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={category.to}
      className="group relative block overflow-hidden bg-ink"
      aria-label={`Explore ${category.title}`}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <SmartImage
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
          ASY Sole Edit
        </p>
        <h3 className="font-display text-3xl font-medium">{category.title}</h3>
        <p className="mt-1 text-[13px] font-light text-ivory/75">{category.subtitle}</p>
        <span className="mt-4 inline-flex items-center gap-2 border-b border-gold/0 pb-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold transition-all duration-300 group-hover:gap-4 group-hover:border-gold">
          Explore Collection <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}