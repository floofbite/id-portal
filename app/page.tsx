import { redirect } from "next/navigation";
import { getLogtoContext } from "@/lib/logto";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const { isAuthenticated } = await getLogtoContext();
    redirect(isAuthenticated ? "/dashboard" : "/portal");
  } catch {
    redirect("/portal");
  }
}
