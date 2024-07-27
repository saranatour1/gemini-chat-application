import { Menu, Link } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { useQuery } from "convex/react";
import { usePathname } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { ToggleBtns } from "../SideBar/ToggleBtns";

export const SheetSummary = () => {
  const threads = useQuery(api.threads.viewer);
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <ToggleBtns />
        <nav className="grid gap-2 text-lg font-medium">
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
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
