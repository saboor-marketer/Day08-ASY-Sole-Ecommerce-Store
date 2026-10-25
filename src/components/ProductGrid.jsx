import ProductCard from "./ProductCard";
import { Reveal } from "./ui";

export default function ProductGrid({ products, columns = 4 }) {
  const cols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 ${cols}`}>
      {products.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i % 4, 3) * 0.06}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}