import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, StarHalf, Minus, Plus, X, Check, Info } from "lucide-react";
import { FALLBACK_IMAGE } from "../data/products";
import { useUI } from "../context/UIContext";

/* ————— Image with graceful fallback ————— */
export function SmartImage({ src, alt, className = "", ...rest }) {
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(src);
  useEffect(() => {
    setCurrent(src);
    setFailed(false);
  }, [src]);
  return (
    <img
      src={failed ? FALLBACK_IMAGE : current || FALLBACK_IMAGE}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}

/* ————— Star rating ————— */
export function Stars({ rating = 0, className = "h-3.5 w-3.5" }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-gold"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return <Star key={i} className={className} fill="currentColor" strokeWidth={0} aria-hidden />;
        if (i === full && half)
          return <StarHalf key={i} className={className} fill="currentColor" strokeWidth={0} aria-hidden />;
        return <Star key={i} className={`${className} text-taupe/60`} strokeWidth={1} aria-hidden />;
      })}
    </span>
  );
}

/* ————— Scroll reveal ————— */
export function Reveal({ children, delay = 0, className = "", y = 28 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ————— Section heading ————— */
export function SectionHeading({ eyebrow, title, action, align = "left" }) {
  return (
    <div
      className={`mb-10 flex flex-wrap items-end gap-4 ${
        align === "center" ? "flex-col text-center items-center" : "justify-between"
      }`}
    >
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="heading-display text-4xl sm:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/* ————— Quantity picker ————— */
export function QtyPicker({ value, onChange, max = 99, small = false }) {
  const size = small ? "h-8 w-8" : "h-11 w-11";
  return (
    <div className="inline-flex items-center border border-ink/20" role="group" aria-label="Quantity">
      <button
        type="button"
        aria-label="Decrease quantity"
        className={`${size} grid place-items-center transition-colors hover:bg-ink hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink`}
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className={`${small ? "w-8 text-sm" : "w-10"} text-center font-medium tabular-nums`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={`${size} grid place-items-center transition-colors hover:bg-ink hover:text-ivory disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ————— Accessible modal shell with focus trap ————— */
export function Modal({ onClose, children, labelledBy, wide = false }) {
  const panelRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const previous = document.activeElement;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      panel.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    const first = focusables()[0];
    (first || panel)?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab") {
        const els = focusables();
        if (!els.length) return;
        const firstEl = els[0];
        const lastEl = els[els.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="absolute inset-0 bg-ink/70"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`relative z-10 max-h-[92dvh] w-full overflow-y-auto lux-scroll bg-ivory shadow-float ${
          wide ? "max-w-4xl" : "max-w-lg"
        }`}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center bg-ivory/90 text-ink transition-colors hover:bg-gold"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ————— Toast stack ————— */
export function ToastStack() {
  const { toasts } = useUI();
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[95] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4" aria-live="polite">
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-3 bg-ink px-5 py-3.5 text-sm text-ivory shadow-float"
        >
          {t.tone === "success" ? (
            <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          ) : (
            <Info className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          )}
          <span>{t.message}</span>
        </motion.div>
      ))}
    </div>
  );
}