"use client"

import * as React from "react"
import { FaCar, FaChartPie } from "react-icons/fa6"
import { BiSolidCarGarage } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";

// import { NavDocuments } from "@/components/nav-documents"
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { TeamSwitcher } from "./team-switcher"
import { NavUser } from "./nav-user";
import { VERSION } from "@/commons/constants/version";


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Lopera",
      logo: <FaCar/>,
      plan: "Empresarial",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Painel",
      url: "/dashboard",
      icon: <AiFillDashboard />,
      // items: [
      //   {
      //     title: "Visão Geral",
      //     url: "/dashboard",
      //   },
      //   {
      //     title: "Custos",
      //     url: "#",
      //   },
      //   {
      //     title: "Faturamento",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Garagem",
      url: "/dashboard/garage",
      icon: <BiSolidCarGarage />,
      isActive: true,
    },
    // {
    //   title: "Relatórios",
    //   url: "/reports",
    //   icon: <FaChartPie />,
    // },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: IconFileDescription,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: IconFileAi,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
