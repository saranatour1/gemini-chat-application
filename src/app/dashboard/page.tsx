"use client";
import { UserNavBar } from "@/components/UserNavBar";
import { useConvexAuth, useQuery } from "convex/react";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonStandingIcon } from "lucide-react";
export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isAuthenticated } = useConvexAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nav = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useQuery(api.users.viewer);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if(!isLoading && !isAuthenticated){
      nav.push('/')
    }
  }, [isAuthenticated,isLoading]);
  return (
    <main className="w-full h-full max-w-full min-h-screen p-8">
      <Suspense fallback={<p>loading..</p>}>
        <UserNavBar>
          {user?.name ?? user?.email ?? user?.phone ?? "Anonymous"}
          <Avatar>
            <AvatarImage src={user?.image} crossOrigin="" />
            <AvatarFallback>
              {" "}
              <PersonStandingIcon />
            </AvatarFallback>
          </Avatar>
        </UserNavBar>
      </Suspense>
    </main>
  );
}
