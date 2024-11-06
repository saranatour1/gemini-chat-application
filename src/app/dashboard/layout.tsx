import { NotSignedIn } from "@/components/NotSignedIn";
import { AppSidebar } from "@/components/SideBar/AppSideBar";
import { SignedIn } from "@/components/SignedIn";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Children } from "@/types";

export default function Layout({ children }: Children) {
  return (
    <>
      <SignedIn>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full p-4 h-screen max-w-full min-h-screen bg-muted/50">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </SignedIn>
      <NotSignedIn />
    </>
  );
}
