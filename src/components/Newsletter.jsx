import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Reveal } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [subscribed, setSubscribed] = useLocalStorage("asy-newsletter-v1", null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed({ email: email.trim(), at: new Date().toISOString() });
  };

  return (
    <section className="bg-ink text-ivory" aria-label="Newsletter">
      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Mail className="h-4 w-4" aria-hidden /> The ASY Sole Letter
          </p>
          <h2 className="heading-display text-4xl sm:text-5xl">
            A LITTLE MORE STYLE
            <br />
            <em className="italic text-gold">IN YOUR INBOX</em>
          </h2>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-ivory/65">
            Get updates on new collections, fresh arrivals, and exclusive offers.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {subscribed ? (
            <div className="border border-gold/40 bg-gold/10 p-8" role="status">
              <p className="flex items-center gap-3 font-display text-2xl">
                <CheckCircle2 className="h-6 w-6 text-gold" aria-hidden />
                You're on the list.
              </p>
              <p className="mt-2 text-sm font-light text-ivory/70">
                <span className="text-gold">{subscribed.email}</span> has been saved locally.
                This is a frontend demo — no emails are actually sent.
              </p>
              <button
                type="button"
                onClick={() => { setSubscribed(null); setEmail(""); }}
                className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="newsletter-email" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/60">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : "newsletter-note"}
                  className="w-full border border-ivory/25 bg-transparent px-5 py-4 text-sm text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none"
                />
                <button type="submit" className="btn-gold shrink-0">
                  Subscribe <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {error && (
                <p id="newsletter-error" role="alert" className="mt-3 flex items-center gap-2 text-sm text-gold">
                  <AlertCircle className="h-4 w-4" aria-hidden /> {error}
                </p>
              )}
              <p id="newsletter-note" className="mt-4 text-[11px] font-light text-ivory/40">
                Demo only — your email is stored in this browser, never sent to a server.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}