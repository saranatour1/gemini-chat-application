'use client'
import { Authenticated } from "convex/react";
import { Aside } from "./SideBar/Aside";
import { Children } from "@/types";
import { Header } from "./Content/Header";

export const SignedIn = ({ children }: Children) => {
  return (
    <Authenticated>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Aside />
      <div className="flex flex-col">
      <Header />
      {children}
      </div>
    </div>
    </Authenticated>
  );
};
