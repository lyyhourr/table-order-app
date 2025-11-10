"use client";

import { NAVIGATION_MENU } from "@/commons/constants/nav-menu-const";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMain() {
  const pathname = usePathname();
  const { isMobile, toggleSidebar, state } = useSidebar();

  return (
    <SidebarGroup>
      {NAVIGATION_MENU.map((menu, i) => (
        <div className={cn(i > 0 && "mt-5")} key={menu.title}>
          <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
          <SidebarMenu>
            {menu.data.map((item) => {
              if (state === "collapsed") {
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      asChild
                      isActive={item.href === pathname}
                    >
                      <Link
                        href={item.href as Route}
                        onClick={() => {
                          if (isMobile) toggleSidebar();
                        }}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              if (item.items?.length) {
                const isSubItemActive = item.items.some(
                  (s) => s.href === pathname
                );

                return (
                  <Collapsible
                    key={item.label}
                    asChild
                    defaultOpen={isSubItemActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.label}>
                          {item.icon && <item.icon />}
                          <span>{item.label}</span>

                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.href === pathname}
                              >
                                <Link
                                  href={subItem.href as Route}
                                  onClick={() => {
                                    if (isMobile) toggleSidebar();
                                  }}
                                >
                                  {subItem.icon && <subItem.icon />}
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    asChild
                    isActive={item.href === pathname}
                  >
                    <Link
                      href={item.href as Route}
                      onClick={() => {
                        if (isMobile) toggleSidebar();
                      }}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}
