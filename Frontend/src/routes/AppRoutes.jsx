import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import {
  Customers,
  CustomerDetails,
  Leads,
  Opportunities,
} from '../pages/PlaceholderPages';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';

/**
 * Main application routing configuration.
 * Configures public login route and protected CRM routes.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Route: Redirects based on auth status */}
      <Route
        path="/"
        element={
          auth.isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Route>

      {/* Catch-all Wildcard Route */}
      <Route
        path="*"
        element={
          auth.isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
