import { getProducts, getCategories } from "@/services/products.service";
import InnerHome from "./InnerHome";

export const metadata = {
  title: 'ShopMart | Your Premium E-Commerce Destination',
  description: 'Discover curated collections of premium products at ShopMart.',
};

export default async function Home() {
  const products = await getProducts(8);
  const categories = await getCategories();

  return <InnerHome products={products} categories={categories} />;
}
