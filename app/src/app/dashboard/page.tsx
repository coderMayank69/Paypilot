'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { IDashboardMetrics } from '@/types';
import DashboardCard from '@/components/DashboardCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6b7280'];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<IDashboardMetrics | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [metricsRes, forecastRes] = await Promise.all([
          apiClient.getDashboardMetrics(),
          apiClient.getCashflowForecast(),
        ]);
        setMetrics(metricsRes.data.data);
        setForecast(forecastRes.data.data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!metrics) {
    return <div>Failed to load dashboard data</div>;
  }

  const riskData = [
    { name: 'Critical', value: metrics.risk.critical, color: '#ef4444' },
    { name: 'High', value: metrics.risk.high, color: '#f59e0b' },
    { name: 'Medium', value: metrics.risk.medium, color: '#eab308' },
    { name: 'Low', value: metrics.risk.low, color: '#10b981' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your business overview.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Invoices"
          value={metrics.summary.totalInvoices}
          icon="📄"
          color="blue"
        />
        <DashboardCard
          title="Paid Invoices"
          value={metrics.summary.paidInvoices}
          icon="✓"
          color="green"
        />
        <DashboardCard
          title="Overdue Invoices"
          value={metrics.summary.overduInvoices}
          icon="⚠️"
          color="red"
        />
        <DashboardCard
          title="Total Clients"
          value={metrics.summary.totalClients}
          icon="👥"
          color="purple"
        />
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Amount</h3>
          <p className="text-3xl font-bold text-gray-900">
            ₹{(metrics.financials.totalAmount / 100000).toFixed(2)}L
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Paid</h3>
          <p className="text-3xl font-bold text-green-600">
            ₹{(metrics.financials.totalPaid / 100000).toFixed(2)}L
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Outstanding</h3>
          <p className="text-3xl font-bold text-red-600">
            ₹{(metrics.financials.outstanding / 100000).toFixed(2)}L
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cashflow Forecast */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">30-Day Cashflow Forecast</h3>
          {forecast.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={forecast}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">No forecast data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
