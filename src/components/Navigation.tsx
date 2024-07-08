"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { menuItems, navItems } from "@/utils/common";
import { Brand } from "./Brand";
import { usePathname } from 'next/navigation'
import { AuthBtn } from "./AuthBtn";
import useAuth from "@/hooks/useAuth";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  const {isLoggedIn} = useAuth()
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="dark">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <Brand />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Brand />
        {navItems.map(([key,value],index)=>(
          <NavbarItem isActive={pathname === value} key={index}>
            <Link href={value}>
            {key}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <AuthBtn />

      <NavbarMenu>
        {isLoggedIn && menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
