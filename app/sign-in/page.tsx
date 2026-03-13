import { redirect } from "next/navigation";
import { signIn, getLogtoContext } from "@/lib/logto";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const { isAuthenticated } = await getLogtoContext();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  await signIn();
  redirect("/");
}
