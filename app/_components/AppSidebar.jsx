"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Search, Compass, GalleryHorizontalEnd, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs';
import { buttonVariants } from "@/components/ui/button";

const menuOption = [
  {
    name: "Home",
    icon: Search,
    path: "/",
  },
  {
    name: "Discover",
    icon: Compass,
    path: "/discover",
  },
  {
    name: "Library",
    icon: GalleryHorizontalEnd,
    path: "/library",
  },
  {
    name: "Sign In",
    icon: LogIn,
    path: "/sign-in",
  },
];

export default function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="bg-accent flex items-center py-5">
        <Image src="/logo.png" alt="Logo" width={150} height={50}style={{ height: "auto" }} />
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {menuOption.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 py-6 hover:bg-transparent hover:font-bold ${
                      path === menu.path ? "font-bold" : ""
                    }`}
                  >
                    <a href={menu.path} className="flex items-center gap-3">
                      {React.createElement(menu.icon, {
                        className: "w-8 h-8",
                      })}
                      <span className="text-lg">{menu.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SignUpButton mode='modal'>
               <button className="bg-primary text-primary-foreground px-4 py-2 mx-4 rounded-full">Sign up</button>    
            </SignUpButton>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className='bg-accent'>
        <div className=" pb-8 flex flex-col  ">
          <h2 className='text-gray-500'>Try Now</h2>
          <p className='text-gray-400 mb-4'>Upgrade for image upload ,smarter Ai & more copilot</p>
          <button className={buttonVariants ({ variant: "secondary", size: "default" })}>                         
              <span className="text-lg ">Learn More</span>      
          </button>
          {/* <button varient ={'secondary'} className={'text-gray-500 mb-3'}>Learn More</button> */}
          <UserButton/>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
