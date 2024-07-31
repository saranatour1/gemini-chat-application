"use client";
import { Children } from "@/types";
import { useState } from "react";
import { ToggleBtns } from "./ToggleBtns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package2, Bell, Home, ShoppingCart, Badge, Package, Users, LineChart, AwardIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export const Aside = () => {
  const threads = useQuery(api.threads.viewer);
  const pathname = usePathname();
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <ToggleBtns />
        <ScrollArea className="flex-1 h-[330px]">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {threads &&
              threads.map((thread, idx) => (
                <Link
                  key={idx}
                  href={`/dashboard/${thread?._id}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === "/dashboard/" + thread?._id ? "bg-muted text-primary" : ""}`}
                >
                  {thread?.summary}
                </Link>
              ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  );
};
