import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "./ui";
import { EDITORIAL } from "../data/categories";

export default function MegaMenu({ title, links, image, onNavigate }) {
  return (
    <div className="grid grid-cols-[1fr_260px] gap-10 p-8">
      <div>
        <p className="eyebrow mb-5">{title}'s Edit</p>
        <ul className="grid grid-cols-2 gap-x-8">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                onClick={onNavigate}
                className="group flex items-center justify-between border-b border-ink/10 py-3 text-sm text-ink/80 transition-colors hover:text-ink"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {link.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-gold opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link
        to={links[0].to}
        onClick={onNavigate}
        className="group relative block overflow-hidden"
        tabIndex={-1}
        aria-hidden
      >
        <SmartImage
          src={image}
          alt=""
          className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-4 left-4 bg-ivory/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em]">
          The {title}'s Collection
        </span>
      </Link>
    </div>
  );
}

export const MENU_IMAGES = {
  Men: EDITORIAL.newArrivals,
  Women: EDITORIAL.story,
};