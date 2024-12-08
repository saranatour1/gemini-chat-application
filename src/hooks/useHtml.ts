import { stringToHtml } from "@/lib/markdown";
import { useLayoutEffect, useState } from "react"

export const useHtml =(text:string)=>{
  const [html,setHtml]= useState('')
  
  useLayoutEffect(()=>{
      const convertToHtml = async ()=>{
        const value = await stringToHtml(text)
        setHtml(String(value))
      }
      convertToHtml()
  },[text])
  
  return {html}
}