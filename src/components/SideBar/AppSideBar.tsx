'use client'
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { UserNavigation } from "../Content/UserNavigation";
import { NavUser } from "../Content/NavUser";
import { useAuthActions } from "@convex-dev/auth/react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  // Add new chat action 
  const addChat = useMutation(api.threads.createThread);
  const createSettings = useMutation(api.settings.createUserSettings)
  const user = useQuery(api.users.viewer);
  const { signOut } = useAuthActions();
  const nav = useRouter();

  const directToLast = async()=>{
    const lastId = await addChat()
    if(lastId){
      nav.push(`/dashboard/${lastId}`)
    }
  }

  useEffect(()=>{
    createSettings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // Note: needs to be moved
  const threads = useQuery(api.threads.viewer);
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Threads</SidebarGroupLabel>
          <SidebarGroupAction title="Add Thread" onClick={directToLast}>
            <Plus /> <span className="sr-only">Add a new thread</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
          <SidebarMenu>
          {threads && threads.map((thread) => (
            <SidebarMenuItem key={thread?._id}>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/" + thread?._id }>
                <Link href={`/dashboard/${thread?._id}`}
                >             
                  <span>{thread?.summary}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{name:user?.name ?? "Jane Doe", email:user?.email ?? "janeDoe@gmail.com", avatar:user?.image ?? ""}} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
