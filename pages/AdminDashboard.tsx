import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import { useData } from '../context/DataContext';
import { UserRole } from '../types';

const AdminDashboard: React.FC = () => {
    const { users, events, campaigns } = useData();

    const totalUsers = users.length;
    const totalAlumni = users.filter(u => u.role === UserRole.Alumni).length;
    const totalStudents = users.filter(u => u.role === UserRole.Student).length;

    const engagementData = events.map(event => ({
        name: event.title.substring(0, 15) + '...',
        attendees: event.rsvps.length
    }));
    
    const industryData = users
        .filter(u => u.role === UserRole.Alumni && u.profile.industry)
        .reduce((acc, user) => {
            const industry = user.profile.industry;
            const existing = acc.find(item => item.name === industry);
            if (existing) {
                existing.value += 1;
            } else {
                acc.push({ name: industry, value: 1 });
            }
            return acc;
        }, [] as { name: string; value: number }[]);

    const totalRaised = campaigns.reduce((sum, camp) => sum + camp.raised, 0);

    const COLORS = ['#0D47A1', '#1976D2', '#FFC107', '#42A5F5', '#81D4FA'];

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Administrator Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform analytics at a glance.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center"><p className="text-4xl font-bold text-brand-primary">{totalUsers}</p><p className="text-gray-500">Total Users</p></Card>
            <Card className="text-center"><p className="text-4xl font-bold text-brand-primary">{totalAlumni}</p><p className="text-gray-500">Alumni</p></Card>
            <Card className="text-center"><p className="text-4xl font-bold text-brand-primary">{totalStudents}</p><p className="text-gray-500">Students</p></Card>
            <Card className="text-center"><p className="text-4xl font-bold text-brand-primary">${totalRaised.toLocaleString()}</p><p className="text-gray-500">Total Raised</p></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <h2 className="text-xl font-semibold mb-4">Event Attendance</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attendees" fill="#1976D2" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
            <Card>
                <h2 className="text-xl font-semibold mb-4">Alumni by Industry</h2>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={industryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={(entry) => `${entry.name} (${entry.value})`}
                        >
                            {industryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
