import { NotSignedIn } from "@sections/NotSignedIn";
import { AppSidebar } from "@sections/SideBar/AppSideBar";
import { SignedIn } from "@sections/SignedIn";
import { SidebarProvider, SidebarTrigger } from "@ui/sidebar";
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
