import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  FileText,
  Bell,
  Settings,
} from 'lucide-react';
import type { RootState } from '../store';

function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users', roles: ['admin'] },
    { icon: Building2, label: 'Agents', path: '/agents', roles: ['admin'] },
    { icon: Stethoscope, label: 'Clinics', path: '/clinics', roles: ['admin', 'agent'] },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            if (item.roles && !item.roles.includes(user?.role || '')) {
              return null;
            }

            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                      isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;