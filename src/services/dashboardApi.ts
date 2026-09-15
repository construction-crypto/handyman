import type { CustomerData } from '../types/dashboard';

const MOCK_FALLBACK: CustomerData = {
  id: '1',
  tier: 'Supreme',
  spend: 1250.00,
  projects: {
    current: [
      {
        id: 'p1',
        title: 'Interior Painting - Living Room',
        date: '2026-08-15',
        status: 'In Progress',
        description: 'Two coats of Sherwin-Williams Emerald Satin.'
      }
    ]
  }
};

export async function fetchDashboardData(customerId = '1'): Promise<CustomerData> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/customer/dashboard-data/${customerId}`);
    if (!response.ok) {
      throw new Error(`API returned status code ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend API endpoint offline or 404. Using fallback state:', error);
    return MOCK_FALLBACK;
  }
}
