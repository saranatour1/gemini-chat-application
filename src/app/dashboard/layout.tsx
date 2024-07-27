import { NotSignedIn } from "@/components/NotSignedIn";
import { Aside } from "@/components/SideBar/Aside";
import { SignedIn } from "@/components/SignedIn";
import { Children } from "@/types";

export default function Layout({ children }: Children) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <NotSignedIn />
    </>
  );
}
