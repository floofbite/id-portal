import { getLogtoContext } from "@/lib/logto";
import { PortalHeader } from "@/components/portal/portal-header";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuthenticated = false;
  try {
    const context = await getLogtoContext();
    isAuthenticated = Boolean(context?.isAuthenticated);
  } catch {
    isAuthenticated = false;
  }
  const accountCenterHref = isAuthenticated ? "/dashboard" : "/sign-in";

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader accountCenterHref={accountCenterHref} />

      {/* Main Content */}
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
