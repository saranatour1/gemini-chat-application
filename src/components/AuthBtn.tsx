import useAuth from "@/hooks/useAuth";
import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export const AuthBtn = () => {
  const { isLoggedIn } = useAuth();
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        {isLoggedIn ? <Button onClick={()=> signOut({callbackUrl:'/'})}>logout</Button>:<Button as={Link} href="/login">sign up</Button> }
      </NavbarItem>
    </NavbarContent>
  );
};
