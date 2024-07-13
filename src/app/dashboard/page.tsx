'use client'
export default function page(){

  return (
    <div className="w-full max-w-[1024px] grid justify-center items-start grid-flow-col pt-6 gap-x-4">
      <div className="col-span-1 w-full max-w-[60px]">
      older messages
      </div>

      <div className="col-span-1 w-full max-w-[200px]">
        current channels
      </div>
    </div>
  )
}