import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

export default function index() {
  const router = useRouter()
  useEffect(() => {
    const {pathname} = router
    if(pathname == '/' ){
        router.push('/login')
    }
  })
  return <div></div>;
}
