import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "./compoents/SideNavBar";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "settings",
  description: "set up the settings for this page.",
};

const sidebarNavItems = [
  {
    title: "settings",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16 md:block max-sm:px-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <ScrollArea className="flex-1 lg:max-w-2xl h-[70vh]  max-h-screen p-4">{children}</ScrollArea>
      </div>
    </div>
  );
}
