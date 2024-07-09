'use client'

import useNavigate from "@/hooks/useNavigate"

export default function page(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nav = useNavigate()
  return (
    <div className="w-full max-w-[1024px] grid justify-center items-start grid-flow-row pt-6">
      welcome to dashboard
    </div>
  )
}