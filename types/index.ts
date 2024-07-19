import { Icons } from "@/components/icons";
import { type UniqueIdentifier } from "@dnd-kit/core";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type ErrorDto = {
  message: string;
  status: number;
};

export const routeMapper: { [key: string]: string } = {
  Home: "/",
  Vendors: "/vendors",
  Booking: "/booking",
  Hangout: "/hangout",
  "About Us": "/about",
  "Contact Us": "/front/contact"
};

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export enum ProfileTypes {
  USER = "user",
  VENDOR = "vendor",
  ADMIN = "admin"
}
