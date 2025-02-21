"use client";
import { LogOut, Plus, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

const items = [
  {
    title: "Clientes",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Cadastrar Cliente",
    url: "/customers/create",
    icon: Plus,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className=" flex items-center justify-center p-4">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="h-full">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="mt-auto">
              <SidebarMenuButton
                className="text-red-500 mt-auto"
                onClick={() => signOut()}
              >
                <LogOut />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
