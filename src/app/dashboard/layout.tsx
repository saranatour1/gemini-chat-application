import { NotSignedIn } from "@/components/NotSignedIn";
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
