import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/services/products.service";

import ProductGallery from "@/app/products/[productId]/_components/ProductGallery";
import ProductInfo from "@/app/products/[productId]/_components/ProductInfo";
import RelatedProducts from "@/app/products/[productId]/_components/RelatedProducts";
import TrustElements from "@/app/products/[productId]/_components/TrustElements";
import ProductTabs from "@/app/products/[productId]/_components/ProductTabs";
import Breadcrumbs from "@/app/products/[productId]/_components/Breadcrumbs";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  let product;
  try {
    product = await getProductById(productId);
  } catch (error) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category._id);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">


      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <Breadcrumbs product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">

          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} mainImage={product.imageCover} />
          </div>


          <div className="lg:col-span-5 flex flex-col gap-8">
            <ProductInfo product={product} />
            <TrustElements />
          </div>
        </div>


        <div className="mt-20">
          <ProductTabs product={product} />
        </div>


        <div className="mt-20">
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
    </div>
  );
}
