'use client'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu"
import { CircleUser } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useAuthActions } from "@convex-dev/auth/react"
import Link from "next/link"

export const UserNavigation = ()=>{
  const  user = useQuery(api.users.viewer);
  const { signOut } = useAuthActions();
  return ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <span className="sr-only">Toggle user menu</span>
        <Avatar>
        <AvatarImage src={user?.image} />
        <AvatarFallback><CircleUser className="h-5 w-5" /></AvatarFallback>
      </Avatar>

      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link  href={`/settings`}>
        Settings
        </Link>
        </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="hover:cursor-pointer" onClick={()=> void signOut()}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>)
}