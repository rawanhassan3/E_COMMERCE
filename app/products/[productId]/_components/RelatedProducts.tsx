import { IProduct } from "@/interfaces/product.interface";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({ products }: { products: IProduct[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-10">
      <div className="flex items-end justify-between border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">You May Also Like</h2>
          <p className="text-slate-500 font-medium">Explore related items that complement your selection</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
