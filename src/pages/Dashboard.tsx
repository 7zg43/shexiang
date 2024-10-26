import React from 'react';
import { useSelector } from 'react-redux';
import { Activity, Users, Building2, Stethoscope, AlertTriangle } from 'lucide-react';
import type { RootState } from '../store';

function StatCard({ icon: Icon, title, value, change, changeType }: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

function DeviceStatus({ id, name, status, lastActive }: {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  lastActive: string;
}) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        Last active: {lastActive}
      </div>
    </div>
  );
}

function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  // Mock data - In a real app, this would come from an API
  const stats = [
    { icon: Activity, title: 'Active Devices', value: 42, change: '+5% from last week', changeType: 'increase' },
    { icon: Users, title: 'Total Patients', value: 1248, change: '+12% from last month', changeType: 'increase' },
    { icon: Building2, title: 'Active Clinics', value: 24, change: '+2 this month', changeType: 'increase' },
    { icon: AlertTriangle, title: 'Alerts', value: 3, change: '-2 from yesterday', changeType: 'decrease' },
  ];

  const devices = [
    { id: 'DEV001', name: 'Device 1', status: 'online', lastActive: '2 minutes ago' },
    { id: 'DEV002', name: 'Device 2', status: 'warning', lastActive: '5 minutes ago' },
    { id: 'DEV003', name: 'Device 3', status: 'offline', lastActive: '1 hour ago' },
    { id: 'DEV004', name: 'Device 4', status: 'online', lastActive: '1 minute ago' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Device Status</h3>
          <button className="text-sm text-blue-600 hover:text-blue-500">View all devices</button>
        </div>
        <div className="space-y-4">
          {devices.map((device) => (
            <DeviceStatus key={device.id} {...device} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;