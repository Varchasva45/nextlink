"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react"

export const Authprovider = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
