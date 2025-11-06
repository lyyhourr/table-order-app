"use client";
import MainLogo from "@/components/custom-ui/main-logo";
import { SidebarHeader } from "@/components/ui/sidebar";

export default function SidebarLogo() {
  return (
    <SidebarHeader className="w-full flex justify-center items-center">
      <MainLogo />
    </SidebarHeader>
  );
}
