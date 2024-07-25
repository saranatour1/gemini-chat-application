import { NotSignedIn } from "@/components/NotSignedIn";
import { Aside } from "@/components/SideBar/Aside";
import { SignedIn } from "@/components/SignedIn";
import { Children } from "@/types";

export default function CustomLayout({ children }: Children) {
  return (
    <html>
      <body className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SignedIn>{children}</SignedIn>
        <NotSignedIn />
      </body>
    </html>
  );
}
