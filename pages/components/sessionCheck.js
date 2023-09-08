import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SessionCheck () {

  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('username');
    console.log(session)

    if (session) {
      router.push('/dashboard');
    }
    
  }, []);

  return null;
};

