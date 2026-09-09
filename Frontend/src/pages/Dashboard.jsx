import { useNavigate, Link } from 'react-router-dom';
import auth from '../utils/auth';

/**
 * Phase 2 Authenticated Dashboard Placeholder
 * Allows verifying successful authentication, route protection, and logout flow.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.getUser();

  const handleLogout = () => {
    auth.logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Temporary Navigation Bar for testing */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            CRM
          </div>
          <span className="font-semibold text-slate-900 text-lg">
            Mini Sales CRM
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            Signed in as: <strong className="text-slate-900">{user?.username || 'admin'}</strong>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-10 px-6 space-y-6">
        {/* Welcome Card */}
        <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome to CRM Dashboard
            </h1>
          </div>
          <p className="text-slate-600 text-sm">
            Frontend authentication is active. You have successfully authenticated as{' '}
            <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-indigo-600 font-semibold">
              {user?.username || 'admin'}
            </code>.
          </p>
        </div>

        {/* Protected Routes Test Matrix */}
        <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
            Protected Routes Verification Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Click these links to verify that protected CRM routes are accessible while authenticated:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <Link
              to="/customers"
              className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
            >
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  Customers
                </div>
                <div className="text-xs text-slate-400 font-mono">/customers</div>
              </div>
              <span className="text-slate-400 group-hover:text-indigo-600">→</span>
            </Link>

            <Link
              to="/customers/1"
              className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
            >
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  Customer Details
                </div>
                <div className="text-xs text-slate-400 font-mono">/customers/:id</div>
              </div>
              <span className="text-slate-400 group-hover:text-indigo-600">→</span>
            </Link>

            <Link
              to="/leads"
              className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
            >
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  Leads
                </div>
                <div className="text-xs text-slate-400 font-mono">/leads</div>
              </div>
              <span className="text-slate-400 group-hover:text-indigo-600">→</span>
            </Link>

            <Link
              to="/opportunities"
              className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
            >
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">
                  Opportunities
                </div>
                <div className="text-xs text-slate-400 font-mono">/opportunities</div>
              </div>
              <span className="text-slate-400 group-hover:text-indigo-600">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
