import { Home, Users, Building, Search, UserPlus, LogIn, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Find Creators", url: "/find-creators", icon: Search },
  { title: "Find Brands", url: "/find-brands", icon: Building },
  { title: "Join as Creator", url: "/join-as-creator", icon: UserPlus },
];

const dashboardItems = [
  { title: "Creator Dashboard", url: "/creator-dashboard", icon: Users },
  { title: "Brand Dashboard", url: "/brand-dashboard", icon: Building },
  { title: "Manager Dashboard", url: "/manager-dashboard", icon: Sparkles },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground";

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar className="md:hidden">
      <SidebarContent>
        <div className="p-4 border-b">
          <a href="/" className="flex items-center gap-3 text-2xl font-bold" onClick={handleLinkClick}>
            <img src={logo} alt="Moni-Fest Logo" className="w-8 h-8" />
            <span className="text-primary">Moni-Fest</span>
          </a>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      onClick={handleLinkClick}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                      onClick={handleLinkClick}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="p-4 space-y-2 border-t mt-auto">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLinkClick}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button 
            variant="coral" 
            className="w-full" 
            onClick={() => {
              window.location.href = '/get-started';
              handleLinkClick();
            }}
          >
            Get Started
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}