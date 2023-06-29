'use client'
import React, { FC, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth/core/types'

type Props = {
  children: ReactNode
  session?: Session
}

const Provider: FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider