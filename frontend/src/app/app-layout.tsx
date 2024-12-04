"use client";

import { CreateProjectDialog } from "@/components/create-project-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Files, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Files },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarContent className="flex flex-col h-full">
          <ScrollArea className="flex-1">
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
          <div className="p-4 flex justify-between items-center">
            <CreateProjectDialog />
            <ModeToggle />
          </div>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 h-full w-full overflow-auto bg-gray-50">
        <div className="h-full w-full py-6 px-4">{children}</div>
      </main>
    </div>
  );
}
