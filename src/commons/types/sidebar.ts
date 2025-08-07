import { ReactNode } from "react";

export type NavLinkItem = {
  title: string;
  url: string;
}

export type NavSectionItem = {
  title: string;
  url: string;
  icon: ReactNode;
  isActive?: boolean;
  items?: NavLinkItem[];
}

export type NavTeamItem = {
  name: string;
  logo: ReactNode;
  plan: string;
}