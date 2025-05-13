
import EmptyFilter from '@/app/components/EmptyFilter'
import React from 'react'

export  default async function SignIn(props: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await props.searchParams
  return (
    <EmptyFilter
        title='You need to be logged in to access this page'
        subtitle='Please click below to login'
        showLogin
        callbackUrl={searchParams.callbackUrl}
    />
  )
}
