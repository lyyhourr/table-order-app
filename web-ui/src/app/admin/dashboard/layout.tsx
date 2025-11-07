import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";
import DashboardHeader from "./_components/header";
import DashboardSidebar from "./_components/sidebar";

export default async function DashboardPageLayout({
  children,
}: PropsWithChildren) {
  return (
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
  );
}
