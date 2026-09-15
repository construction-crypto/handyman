import { useEffect, useState } from 'react';
import type { CustomerData } from './types/dashboard';
import { fetchDashboardData } from './services/dashboardApi';
import { SelfServiceWidget } from './components/SelfServiceWidget';
import { DocumentVaultWidget } from './components/DocumentVaultWidget';
import { DirectChatWidget } from './components/DirectChatWidget';

export default function App() {
  const [data, setData] = useState<CustomerData | null>(null);

  useEffect(() => {
    fetchDashboardData().then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Handyman Painting Dashboard</h1>
          <p className="text-xs text-slate-500">Customer Tier: <span className="font-bold text-amber-600">{data?.tier || 'Loading...'}</span></p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
          <span className="text-xs text-slate-400 block">Total Spend</span>
          <span className="text-lg font-bold text-slate-800">${data?.spend?.toFixed(2) ?? '0.00'}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SelfServiceWidget />
        <DocumentVaultWidget />
        <DirectChatWidget />
      </main>
    </div>
  );
}
