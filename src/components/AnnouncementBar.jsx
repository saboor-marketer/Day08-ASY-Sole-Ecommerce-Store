export default function AnnouncementBar() {
  const message = "Discover Your Style | Explore the ASY Sole Collection";
  return (
    <div className="overflow-hidden bg-ink text-ivory" role="region" aria-label="Announcement">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2 motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 text-[11px] font-light uppercase tracking-[0.3em] motion-reduce:mx-0 motion-reduce:[&:not(:first-child)]:hidden"
            aria-hidden={i > 0}
          >
            {message} <span className="mx-4 text-gold" aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}