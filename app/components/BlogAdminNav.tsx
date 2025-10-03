'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { 
  FileText, 
  Image, 
  Settings, 
  Plus, 
  BarChart3,
  Users
} from 'lucide-react';

export default function BlogAdminNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user || !['content_writer', 'admin', 'owner'].includes(user.role)) {
    return null;
  }

  const navItems = [
    {
      href: '/blog/create',
      label: 'Create Post',
      icon: Plus,
      roles: ['content_writer', 'admin', 'owner']
    },
    {
      href: '/blog/media',
      label: 'Media Library',
      icon: Image,
      roles: ['content_writer', 'admin', 'owner']
    },
    {
      href: '/blog/settings',
      label: 'Settings',
      icon: Settings,
      roles: ['admin', 'owner']
    },
    {
      href: '/blog/analytics',
      label: 'Analytics',
      icon: BarChart3,
      roles: ['admin', 'owner']
    },
    {
      href: '/blog/users',
      label: 'User Management',
      icon: Users,
      roles: ['admin', 'owner']
    }
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href="/blog"
              className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Blog Admin
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
