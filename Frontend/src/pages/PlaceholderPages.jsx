import { Link, useParams } from 'react-router-dom';

const PageWrapper = ({ title, route, children }) => (
  <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
    <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <span className="text-xs font-mono text-indigo-600">{route}</span>
        </div>
        <Link
          to="/dashboard"
          className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200 transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <div className="text-sm text-slate-600 leading-relaxed">
        {children || (
          <p>
            This is a protected route placeholder for Phase 2 route testing. The complete module will be built in subsequent phases.
          </p>
        )}
      </div>
    </div>
  </div>
);

export const Customers = () => (
  <PageWrapper title="Customers" route="/customers" />
);

export const CustomerDetails = () => {
  const { id } = useParams();
  return (
    <PageWrapper title={`Customer Details (ID: ${id})`} route={`/customers/${id}`}>
      <p>Viewing customer details for ID: <strong>{id}</strong>.</p>
    </PageWrapper>
  );
};

export const Leads = () => (
  <PageWrapper title="Leads" route="/leads" />
);

export const Opportunities = () => (
  <PageWrapper title="Opportunities" route="/opportunities" />
);
