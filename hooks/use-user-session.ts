import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

type UseUserSessionType = () => {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: Session['user'];
};

export const useUserSession: UseUserSessionType = () => {
  const { data, status } = useSession();

  return {
    isLoading: status === 'loading',
    isAuthenticated: status !== 'unauthenticated',
    user: data?.user,
  };
};
