import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexCheck () {

  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('username');
    console.log(session)

    if (session) {
      router.push('/dashboard');
    }
    else{
      router.push('/login');
    }
    
  }, []);

  return null;
};

