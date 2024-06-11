import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateToken } from '../features/auth/authSlice';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(validateToken());
    }
  }, [dispatch, token, user]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
