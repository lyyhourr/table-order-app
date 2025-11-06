import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileDropdown from "./profile-dropdown";
import ToggleThemeMode from "./toggle-theme-mode";

export default async function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b border-secondary sticky top-0 z-30 bg-background">
      <div className="flex items-center justify-between w-full px-5 h-full overflow-hidden">
        <div className="flex items-center gap-2 min-w-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <div className="flex items-center gap-4">
          <ToggleThemeMode />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
