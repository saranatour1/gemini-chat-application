'use client'

import { Test } from "@/components/Test"
import useAuth from "@/hooks/useAuth"
import useNavigate from "@/hooks/useNavigate"
import { useEffect } from "react"

export default function page(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nav = useNavigate()

  return (
    <div className="w-full max-w-[1024px] grid justify-center items-start grid-flow-col pt-6 gap-x-4">
      <Test/>
      <div className="col-span-1 w-full max-w-[60px]">
      older messages
      </div>

      <div className="col-span-1 w-full max-w-[200px]">
        current channels
      </div>
    </div>
  )
}