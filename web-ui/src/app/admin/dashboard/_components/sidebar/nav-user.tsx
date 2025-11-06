"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export default function NavUser() {
  const { isMobile } = useSidebar();

  const user = {
    fullName: "John Doe",
    username: "johndoe",
    profilePicture: null,
  };

  const initials = user?.fullName[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-muted data-[state=open]:text-foreground/90"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.profilePicture && (
                  <AvatarImage
                    src={user.profilePicture}
                    alt="Profile Picture"
                  />
                )}
                <AvatarFallback className="rounded-lg capitalize">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2 flex flex-col text-left text-sm">
                <span className="font-medium truncate">{user?.fullName}</span>
                <span className="text-xs text-muted-foreground truncate">
                  @{user?.username}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-70" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0">
              <div className="flex items-center gap-3 px-4 py-3">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.profilePicture && (
                    <AvatarImage
                      src={user.profilePicture}
                      alt="Profile Picture"
                    />
                  )}
                  <AvatarFallback className="rounded-lg capitalize">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 text-sm">
                  <span className="font-semibold truncate">
                    {user?.fullName}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    @{user?.username}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2 text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
