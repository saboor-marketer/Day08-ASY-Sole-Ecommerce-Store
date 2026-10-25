import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-28 text-center">
      <p className="font-display text-[7rem] font-semibold leading-none text-taupe/40">404</p>
      <Compass className="-mt-6 h-10 w-10 text-gold" aria-hidden />
      <h1 className="heading-display mt-6 text-4xl sm:text-5xl">This page has wandered off.</h1>
      <p className="mt-4 max-w-md text-[15px] font-light text-ink/60">
        The piece you're looking for may have moved, sold out, or never existed.
        Let's get you back to the collection.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-ink">Back to Home</Link>
        <Link to="/collection/new-arrivals" className="btn-outline">Shop New Arrivals</Link>
      </div>
    </div>
  );
}