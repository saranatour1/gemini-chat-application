import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useNavigate = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!session) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  return { session, status };
};

export default useNavigate;