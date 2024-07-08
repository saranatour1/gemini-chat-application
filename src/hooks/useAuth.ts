import { useSession } from 'next-auth/react';

const useAuth = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;

  return { session, status, isLoggedIn };
};

export default useAuth;
