import { getProducts, getCategories, getBrands } from "@/services/products.service";
import InnerProducts from "./InnerProducts";

export const metadata = {
  title: 'Shop All Products | ShopMart',
  description: 'Browse our full collection of premium products.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string };
}) {
  const { category: categoryId, brand: brandId } = await searchParams;
  let products = [];
  let selectedCategory = null;
  let selectedBrand = null;

  try {
    products = await getProducts(40, 1, categoryId, brandId) || [];

    if (categoryId) {
      const categories = await getCategories();
      selectedCategory = categories.find((c) => c._id === categoryId);
    }

    if (brandId) {
      const brands = await getBrands();
      selectedBrand = brands.find((b) => b._id === brandId);
    }
  } catch (error) {
    console.error("Products page data fetch error:", error);
  }

  return (
    <InnerProducts 
      products={products} 
      selectedCategory={selectedCategory}
      selectedBrand={selectedBrand}
    />
  );
}
