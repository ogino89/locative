import { useEffect, useState } from 'react';
import instance from '../../axios/axios';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchNewAccesTokenRefreshToken } from '../../redux/slices/auth/useCases/fetchNewAccesTokenRefreshToken';
import { relogedConnectedUser } from '../../redux/slices/auth/useCases/relogedConnectedUser';
import Loading from '../shared/Loading';

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const addAxiosResponseInterceptor = () => {
    instance.interceptors.response.use(
      (config) => {
        const token = localStorage.getItem('at');
        if (token) {
          // Configure this as per your backend requirements
          config.headers!['Authorization'] = token;
        }
        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  };

  /**
   * Check if the user is connected
   * If yes then reload the user data
   */
  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        // verify if the user is connected
        const accessToken = localStorage.getItem('at');
        if (!accessToken) {
          setLoading(false);
          return;
        }
        // if the user is connected then reload the user data
        await dispatch(relogedConnectedUser()).unwrap();
        setLoading(false);
      } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403) {
          await dispatch(fetchNewAccesTokenRefreshToken());
          fetchConnectedUser();
        }
        setLoading(false);
      }
    };
    addAxiosResponseInterceptor();
    fetchConnectedUser();
  }, [dispatch]);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default AuthProvider;
