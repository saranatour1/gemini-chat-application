'use client'
import { Authenticated } from "convex/react";
import { Aside } from "./SideBar/Aside";
import { Children } from "@/types";
import { Header } from "./Content/Header";

export const SignedIn = ({ children }: Children) => {
  return (
    <Authenticated>
      <Aside />
      <div className="flex flex-col">
      <Header />
      {children}
      </div>
    </Authenticated>
  );
};
