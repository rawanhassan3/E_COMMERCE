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
  const products = await getProducts(40, 1, categoryId, brandId);

  let selectedCategory = null;
  let selectedBrand = null;

  if (categoryId) {
    const categories = await getCategories();
    selectedCategory = categories.find((c) => c._id === categoryId);
  }

  if (brandId) {
    const brands = await getBrands();
    selectedBrand = brands.find((b) => b._id === brandId);
  }

  return (
    <InnerProducts 
      products={products} 
      selectedCategory={selectedCategory}
      selectedBrand={selectedBrand}
    />
  );
}
