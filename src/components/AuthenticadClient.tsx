'use client'

import { Children } from "@/types"
import { Authenticated, Unauthenticated } from 'convex/react';

export const AuthenticatedClient =({children}:Children)=>{
  return <Authenticated>
      {children}
  </Authenticated>
}

export const UnauthenticatedClient = ({children}:Children) =>{
  return <Unauthenticated>
    {children}
  </Unauthenticated>
}