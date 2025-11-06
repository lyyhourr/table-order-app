import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import NavMain from "./nav-main";
import NavUser from "./nav-user";
import SidebarLogo from "./sidebar-logo";

export default async function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="z-40">
      <SidebarLogo />
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
