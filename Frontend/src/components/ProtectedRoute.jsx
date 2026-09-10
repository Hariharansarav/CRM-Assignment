import { Navigate, Outlet } from 'react-router-dom';

/**
 * Route guard component for authenticated CRM pages.
 * Checks whether user is authenticated using localStorage key 'isAuthenticated'.
 * If authenticated, allows access via <Outlet />.
 * Otherwise, redirects unauthenticated users to /login.
 */
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
