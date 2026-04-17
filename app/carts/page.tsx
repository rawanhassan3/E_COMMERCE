import InnerCart from "./innercart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.user?.accessToken;

  if (!token) {
    redirect("/auth/signin");
  }

  return (
    <>
      <InnerCart />
    </>
  );
}
