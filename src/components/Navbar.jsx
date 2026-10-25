import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search, User, Heart, ShoppingBag, Menu, X, ChevronDown,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUI } from "../context/UIContext";
import { MEGA_MENUS } from "../data/categories";
import MegaMenu, { MENU_IMAGES } from "./MegaMenu";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Men", to: "/collection/men", mega: "Men" },
  { label: "Women", to: "/collection/women", mega: "Women" },
  { label: "Shoes", to: "/collection/shoes" },
  { label: "Watches", to: "/collection/watches" },
  { label: "New Arrivals", to: "/collection/new-arrivals" },
  { label: "Sale", to: "/collection/sale", gold: true },
];

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex flex-col items-center leading-none" aria-label="ASY SOLE — home">
      <span className="font-display text-[26px] font-semibold tracking-[0.24em] text-ink">
        ASY<span className="mx-1 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" aria-hidden />SOLE
      </span>
      <span className="mt-0.5 text-[8px] font-light uppercase tracking-[0.5em] text-taupe transition-colors group-hover:text-gold">
        Premium Fashion
      </span>
    </Link>
  );
}

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function Navbar() {
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { setSearchOpen, setCartOpen } = useUI();
  const location = useLocation();
  const reduce = useReducedMotion();

  const [openMega, setOpenMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 120);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const iconBtn =
    "relative grid h-10 w-10 place-items-center text-ink transition-colors hover:text-gold";

  return (
    <header className={`sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? "shadow-card" : ""}`}>
      <div className="container-x">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* mobile hamburger */}
          <button
            type="button"
            className={`${iconBtn} lg:hidden`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
          </button>

          <Logo />

          {/* desktop nav */}
          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => { cancelClose(); setOpenMega(link.mega || null); }}
                  onMouseLeave={scheduleClose}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onFocus={() => setOpenMega(link.mega || null)}
                    className={({ isActive }) =>
                      `flex items-center gap-1 py-6 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold ${
                        link.gold ? "text-gold" : isActive ? "text-ink" : "text-ink/70"
                      }`
                    }
                  >
                    {link.label}
                    {link.mega && <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${openMega === link.mega ? "rotate-180" : ""}`} aria-hidden />}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* actions */}
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <button type="button" className={iconBtn} aria-label="Search products" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <Link to="/account" className={`${iconBtn} hidden sm:grid`} aria-label="Account">
              <User className="h-5 w-5" strokeWidth={1.6} />
            </Link>
            <Link to="/wishlist" className={iconBtn} aria-label={`Wishlist, ${wishCount} items`}>
              <Heart className="h-5 w-5" strokeWidth={1.6} />
              <CountBadge count={wishCount} />
            </Link>
            <button type="button" className={iconBtn} aria-label={`Shopping bag, ${cartCount} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
              <CountBadge count={cartCount} />
            </button>
          </div>
        </div>
      </div>

      {/* desktop mega menu */}
      <AnimatePresence>
        {openMega && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 top-full hidden border-t border-ink/10 bg-ivory shadow-float lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="container-x">
              <MegaMenu
                title={openMega}
                links={MEGA_MENUS[openMega]}
                image={MENU_IMAGES[openMega]}
                onNavigate={() => setOpenMega(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-[72px] z-40 bg-ink/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              className="fixed inset-y-0 left-0 top-[72px] z-50 w-[85%] max-w-sm overflow-y-auto lux-scroll bg-ivory lg:hidden"
              initial={reduce ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile"
            >
              <ul className="divide-y divide-ink/10 px-6 py-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) =>
                          `flex-1 py-4 font-display text-2xl ${link.gold ? "text-gold" : isActive ? "text-gold" : "text-ink"}`
                        }
                      >
                        {link.label}
                      </NavLink>
                      {link.mega && (
                        <button
                          type="button"
                          aria-label={`Expand ${link.label} categories`}
                          aria-expanded={mobileSection === link.mega}
                          onClick={() => setMobileSection((s) => (s === link.mega ? null : link.mega))}
                          className="grid h-10 w-10 place-items-center"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === link.mega ? "rotate-180 text-gold" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {link.mega && mobileSection === link.mega && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {MEGA_MENUS[link.mega].map((sub) => (
                            <li key={sub.label}>
                              <Link to={sub.to} className="block py-2.5 pl-4 text-sm text-ink/70 hover:text-gold">
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-3" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
              <div className="border-t border-ink/10 px-6 py-5">
                <Link to="/account" className="flex items-center gap-3 py-2 text-sm uppercase tracking-[0.18em] text-ink/70">
                  <User className="h-4 w-4 text-gold" aria-hidden /> Account
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 py-2 text-sm uppercase tracking-[0.18em] text-ink/70">
                  <Heart className="h-4 w-4 text-gold" aria-hidden /> Wishlist ({wishCount})
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}