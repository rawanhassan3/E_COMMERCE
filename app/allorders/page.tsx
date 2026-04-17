import { getAllOrders } from "@/services/products.service";
import InnerAllOrders from "./InnerAllOrders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Orders",
  description: "View all your ShopMart orders and their status.",
};

export default async function AllOrdersPage() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.user?.accessToken;

  if (!token) {
    redirect("/auth/signin");
  }

  const orders = await getAllOrders(token);
  return <InnerAllOrders orders={orders} />;
}
