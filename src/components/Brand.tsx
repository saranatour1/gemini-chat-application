import { NavbarBrand } from "@nextui-org/react"
import { Chat } from "./Logo/Chat"

export const Brand =()=>{
  return (
    <NavbarBrand>
    <Chat />
    <p className="font-bold text-inherit">chatty</p>
  </NavbarBrand>
  )
}