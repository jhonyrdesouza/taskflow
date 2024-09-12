import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
import { SignIn } from '../pages/sign-in';
import { SignUp } from '../pages/sign-up';
import { Task } from '../pages/task';
import PrivateRoute from './private-router';

export const Router = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/task" /> : <SignIn />} />
      <Route path="/sign-up" element={user ? <Navigate to="/task" /> : <SignUp />} />
      <Route
        path="/task"
        element={
          <PrivateRoute>
            <Task />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
