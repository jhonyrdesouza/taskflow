import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import api from '../lib/axios';

type AuthProps = {
  email: string;
  password: string;
};

type UserProps = {
  cuid: string;
  fullname: string;
  email: string;
  avatar: string;
  permissions: string[];
};

export type AuthContextType = {
  user: UserProps | null;
  login: (data: AuthProps) => Promise<void>;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: Readonly<AuthContextProviderProps>) {
  const [user, setUser] = useState<UserProps | null>(null);

  const login = useCallback(
    async ({ email, password }: AuthProps) => {
      try {
        const { data } = await api.post<{ token: string; user: UserProps }>('/auth/login', { email, password });

        setCookie(undefined, '@taskflow.token', data.token, {
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        });

        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data.user);
        redirect('/dashboard');
      } catch (error) {
        console.error('Login failed', error);
      }
    },
    [redirect],
  );

  const logout = useCallback(() => {
    destroyCookie(undefined, '@taskflow.token');
    setUser(null);
    redirect('/login');
  }, [redirect]);

  useEffect(() => {
    const { '@taskflow.token': token } = parseCookies();

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      api
        .get<{ user: UserProps }>('/user/me')
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, [logout]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
