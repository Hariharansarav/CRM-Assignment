import ApiHealthTest from '../components/ApiHealthTest';

/**
 * Phase 1 Placeholder Home Page
 * Styled with Tailwind CSS v4
 */
const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="flex items-center gap-3 border-b border-slate-200 pb-5">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            CRM
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Mini Sales CRM
            </h1>
            <p className="text-sm text-slate-500">
              Phase 1: Architecture &amp; Scalable Foundation
            </p>
          </div>
        </header>

        {/* Foundation Status Card */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-semibold text-slate-900">
              Foundation Readiness Status
            </h2>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
              Active
            </span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <dt className="text-slate-500 font-medium text-xs uppercase tracking-wider">Frontend Core</dt>
              <dd className="mt-1 font-semibold text-slate-800">React 19 + Vite 8</dd>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <dt className="text-slate-500 font-medium text-xs uppercase tracking-wider">Styling System</dt>
              <dd className="mt-1 font-semibold text-slate-800">Tailwind CSS v4</dd>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <dt className="text-slate-500 font-medium text-xs uppercase tracking-wider">Routing Architecture</dt>
              <dd className="mt-1 font-semibold text-slate-800">React Router v7</dd>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <dt className="text-slate-500 font-medium text-xs uppercase tracking-wider">HTTP Client Service</dt>
              <dd className="mt-1 font-semibold text-slate-800">
                Axios (<code className="text-xs text-indigo-600 font-mono">src/services/api.js</code>)
              </dd>
            </div>
          </dl>

          <div className="pt-1">
            <span className="text-xs font-medium text-slate-500">API Base URL:</span>
            <div className="mt-1 font-mono text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-md">
              {import.meta.env.VITE_API_BASE_URL || 'Not Set'}
            </div>
          </div>
        </section>

        {/* Backend Connection Test Component */}
        <ApiHealthTest />
      </div>
    </main>
  );
};

export default Home;
