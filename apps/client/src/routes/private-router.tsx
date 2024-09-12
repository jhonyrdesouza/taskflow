import { parseCookies } from 'nookies';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const cookies = parseCookies();
  const token = cookies['@taskflow.token'];

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
