import React from 'react'
import { useRouter } from 'next/dist/client/router'

const Page401 = () => {
  const router = useRouter()

  return (
    router.push('/login')
  )
}

export default Page401