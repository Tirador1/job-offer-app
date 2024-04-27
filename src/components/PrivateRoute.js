import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
