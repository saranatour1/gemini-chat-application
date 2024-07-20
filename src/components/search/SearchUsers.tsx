import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Suspense, useEffect, useMemo } from "react";

export const SearchUsers = ({
  searchField,
  setUserId,
}: {
  searchField: string;
  setUserId: (id: Id<"users">) => void;
}) => {
  const users = useQuery(api.users.list);
  const user = useQuery(api.users.viewer)
  const usersBySearch = useMemo(() => {
    return users
      ?.map(user => (user.name?.toLowerCase().includes(searchField.toLowerCase()) ? user : null))
      .filter(t => t != null && user?._id !== t._id );
  }, [users, searchField, user]);
  
  return (
    <Suspense fallback={<p>loading...</p>}>
      {!usersBySearch?.length && <p>no users found</p>}
      {usersBySearch && (
        <Select onValueChange={(val) => setUserId(val as Id<"users">)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>users</SelectLabel>
              {usersBySearch?.map((user, idx) => (
                <SelectItem key={idx} value={user!._id}>
                  {user!.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </Suspense>
  );
};
