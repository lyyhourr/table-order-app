import { getCookie } from "@/commons/helpers/cookie-helper";
import { TAuthUser } from "@/commons/types/auth-type";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import api from "@/lib/api-client";
import AuthProvider from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";
import DashboardHeader from "./_components/header";
import DashboardSidebar from "./_components/sidebar";

export default async function DashboardPageLayout({
  children,
}: PropsWithChildren) {
  const token = await getCookie("token");

  if (!token) {
    redirect("/admin/unauthorized");
  }

  const { data, status, success } = await api.get<TAuthUser>("/auth/profile");

  if (status === 401 && !success) {
    redirect("/admin/unauthorized");
  }

  return (
    <AuthProvider user={data ?? null}>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden pt-3 pb-10 px-3 lg:px-7">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
