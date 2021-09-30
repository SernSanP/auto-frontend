import React, { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

const Page404 = () => {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => router.push('/login'), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default Page404;
