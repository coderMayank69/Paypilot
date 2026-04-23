'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/clients', label: 'Clients', icon: '👥' },
    { href: '/invoices', label: 'Invoices', icon: '📄' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/dashboard" className="text-2xl font-bold">
          PayPilot
        </Link>
        <p className="text-xs text-gray-400 mt-1">Invoice Copilot</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-6 border-t border-gray-700">
        <div className="mb-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-medium text-white">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
