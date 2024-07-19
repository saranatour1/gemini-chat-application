'use client'
import { useAuthActions } from "@convex-dev/auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Authenticated, useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { PersonStandingIcon } from "lucide-react";

interface Props {
  children?: ReactNode;
}
export const UserNavBar = ({ children }: Props) => {
  const { signOut } = useAuthActions();
  const navigate = useRouter();
  const user = useQuery(api.users.viewer);
  return (
    <Authenticated>
      <nav className="w-full h-full max-h flex items-end justify-end min-h-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="py-4 px-2 w-full  max-w-fit max-h-fit flex items-center justify-center gap-x-4"
            >
              {user?.name ?? user?.email ?? user?.phone ?? "Anonymous"}
              <Avatar>
                <AvatarImage src={user?.image} crossOrigin="" className=" inline-block max-w-36 max-h-8"/>
                <AvatarFallback>
                  {" "}
                  <PersonStandingIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate.push("/profile")}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => void signOut()}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </Authenticated>
  );
};
