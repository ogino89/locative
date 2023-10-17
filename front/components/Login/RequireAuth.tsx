import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const RequireAuth = ({ children }: any) => {
  const { isLogedIn } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isLogedIn) window.location.href = '/login';
  }, [isLogedIn]);
  if (isLogedIn) return children;
  return null;
};

export default RequireAuth;
