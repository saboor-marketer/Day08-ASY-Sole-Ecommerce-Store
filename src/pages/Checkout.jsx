import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, DEMO_SHIPPING_FLAT } from "../utils/currency";
import { SmartImage } from "../components/ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  { name: "email", label: "Email address", type: "email", autoComplete: "email", group: "contact", placeholder: "you@example.com" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", group: "contact", placeholder: "+92 300 0000000" },
  { name: "firstName", label: "First name", autoComplete: "given-name", group: "shipping" },
  { name: "lastName", label: "Last name", autoComplete: "family-name", group: "shipping" },
  { name: "address", label: "Street address", autoComplete: "street-address", group: "shipping", full: true },
  { name: "city", label: "City", autoComplete: "address-level2", group: "shipping" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code", group: "shipping" },
  { name: "country", label: "Country", autoComplete: "country-name", group: "shipping", defaultValue: "Pakistan" },
];

const initialForm = Object.fromEntries(FIELDS.map((f) => [f.name, f.defaultValue || ""]));

export default function Checkout() {
  const { lines, count, subtotal, clearCart } = useCart();
  const [step, setStep] = useState("details"); // details | review | done
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [demoRef, setDemoRef] = useState("");

  const total = subtotal + (lines.length ? DEMO_SHIPPING_FLAT : 0);

  const validate = () => {
    const next = {};
    FIELDS.forEach((f) => {
      if (!form[f.name].trim()) next[f.name] = `${f.label} is required.`;
    });
    if (form.email && !EMAIL_RE.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.phone && !/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitDetails = (e) => {
    e.preventDefault();
    if (validate()) {
      setStep("review");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const confirmDemo = () => {
    setDemoRef(`ASY-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    clearCart();
    setStep("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const field = (f) => (
    <label key={f.name} className={`block ${f.full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70">
        {f.label} <span className="text-gold">*</span>
      </span>
      <input
        type={f.type || "text"}
        autoComplete={f.autoComplete}
        value={form[f.name]}
        placeholder={f.placeholder || ""}
        onChange={(e) => {
          setForm((prev) => ({ ...prev, [f.name]: e.target.value }));
          setErrors((prev) => ({ ...prev, [f.name]: undefined }));
        }}
        aria-invalid={Boolean(errors[f.name])}
        className={`input-field ${errors[f.name] ? "border-gold bg-gold/10" : ""}`}
      />
      {errors[f.name] && (
        <span role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-ink">
          <AlertCircle className="h-3.5 w-3.5 text-gold" aria-hidden /> {errors[f.name]}
        </span>
      )}
    </label>
  );

  if (step === "done") {
    return (
      <div className="container-x flex flex-col items-center py-24 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-gold/15">
          <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden />
        </span>
        <p className="eyebrow mt-8">Checkout Preview Complete</p>
        <h1 className="heading-display mt-3 text-5xl">Thank you, {form.firstName || "friend"}.</h1>
        <p className="mt-4 max-w-md text-[15px] font-light leading-relaxed text-ink/65">
          Your demo reference is <span className="font-semibold text-gold">{demoRef}</span>.
          This was a <strong className="font-medium">frontend preview only</strong> — no payment was taken,
          no order was submitted, and no email will be sent. Connecting a backend
          and payment provider turns this flow into a real checkout.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/collection/new-arrivals" className="btn-ink">Continue Shopping</Link>
          <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-x flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBag className="h-10 w-10 text-taupe" aria-hidden />
        <h1 className="heading-display text-4xl">Your bag is empty</h1>
        <p className="max-w-sm text-sm font-light text-ink/60">Add a few pieces before heading to checkout.</p>
        <Link to="/collection/new-arrivals" className="btn-ink mt-2">Browse the Collection</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 lg:py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5" aria-hidden /> Checkout Preview
        </p>
        <h1 className="heading-display text-5xl">Checkout</h1>
        {/* steps */}
        <ol className="mt-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em]">
          {["Details", "Review", "Confirmation"].map((label, i) => {
            const idx = step === "details" ? 0 : 1;
            return (
              <li key={label} className="flex items-center gap-3">
                <span className={`grid h-7 w-7 place-items-center rounded-full border text-[11px] ${i <= idx ? "border-gold bg-gold text-ink" : "border-ink/20 text-taupe"}`}>
                  {i + 1}
                </span>
                <span className={i <= idx ? "text-ink" : "text-taupe"}>{label}</span>
                {i < 2 && <span className="h-px w-8 bg-ink/20" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          {step === "details" ? (
            <form onSubmit={submitDetails} noValidate>
              <h2 className="font-display text-2xl font-medium">Contact Information</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {FIELDS.filter((f) => f.group === "contact").map(field)}
              </div>
              <h2 className="mt-10 font-display text-2xl font-medium">Shipping Address</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {FIELDS.filter((f) => f.group === "shipping").map(field)}
              </div>
              <div className="mt-8 border border-gold/40 bg-gold/10 px-5 py-4 text-[13px] font-light leading-relaxed">
                <strong className="font-medium">Demo notice:</strong> no payment card details are
                collected. Payment processing and real order submission require a
                backend integration — this preview validates and reviews your details only.
              </div>
              <button type="submit" className="btn-ink mt-8 w-full sm:w-auto">
                Review Order <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </form>
          ) : (
            <div>
              <h2 className="font-display text-2xl font-medium">Review Your Details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="border border-ink/10 p-5">
                  <p className="eyebrow mb-2">Contact</p>
                  <p className="text-sm">{form.email}</p>
                  <p className="text-sm">{form.phone}</p>
                </div>
                <div className="border border-ink/10 p-5">
                  <p className="eyebrow mb-2">Ship to</p>
                  <p className="text-sm">{form.firstName} {form.lastName}</p>
                  <p className="text-sm">{form.address}</p>
                  <p className="text-sm">{form.city}, {form.postalCode}</p>
                  <p className="text-sm">{form.country}</p>
                </div>
              </div>
              <h3 className="mt-8 font-display text-xl font-medium">Items ({count})</h3>
              <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
                {lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-4 py-3">
                    <SmartImage src={l.product.images[0]} alt={l.product.name} className="h-16 w-13 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{l.product.name}</p>
                      <p className="text-xs text-ink/55">
                        {l.size && `Size ${l.size}`} {l.size && l.color && "·"} {l.color} × {l.qty}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{formatPrice(l.qty * l.product.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => setStep("details")} className="btn-outline">
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Edit Details
                </button>
                <button type="button" onClick={confirmDemo} className="btn-gold flex-1 sm:flex-none">
                  Confirm Demo Order <CheckCircle2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <p className="mt-4 text-[12px] font-light text-taupe">
                Confirming completes the demo flow only — nothing is charged or shipped.
              </p>
            </div>
          )}
        </div>

        <aside className="h-fit border border-ink/10 bg-taupe/10 p-7 lg:sticky lg:top-28" aria-label="Order summary">
          <h2 className="font-display text-2xl font-medium">Summary</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto lux-scroll pr-1">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <SmartImage src={l.product.images[0]} alt="" className="h-14 w-11 object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-semibold text-gold">{l.qty}</span>
                </div>
                <p className="min-w-0 flex-1 truncate text-xs">{l.product.name}</p>
                <span className="text-xs font-medium">{formatPrice(l.qty * l.product.price)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-ink/15 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink/60">Shipping <span className="text-[10px] uppercase text-gold">(demo)</span></dt><dd>{formatPrice(DEMO_SHIPPING_FLAT)}</dd></div>
            <div className="flex justify-between border-t border-ink/15 pt-3 text-lg font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}