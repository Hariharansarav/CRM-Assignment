import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

/**
 * Route guard component for authenticated CRM pages.
 * Redirects unauthenticated visitors to /login preserving target location in history state.
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = auth.isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
