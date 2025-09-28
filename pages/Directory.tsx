import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { UserRole } from '../types';
import Card from '../components/Card';

const Directory: React.FC = () => {
  const { users } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduationYear: '',
    industry: '',
    location: ''
  });

  const alumni = users.filter(u => u.role === UserRole.Alumni || u.role === UserRole.Admin);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.profile.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.profile.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = filters.graduationYear ? user.profile.graduationYear.toString() === filters.graduationYear : true;
      const matchesIndustry = filters.industry ? user.profile.industry.toLowerCase().includes(filters.industry.toLowerCase()) : true;
      const matchesLocation = filters.location ? user.profile.location.toLowerCase().includes(filters.location.toLowerCase()) : true;

      return matchesSearch && matchesYear && matchesIndustry && matchesLocation;
    });
  }, [searchTerm, filters, alumni]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ graduationYear: '', industry: '', location: '' });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Alumni Directory</h1>
          <p className="text-gray-600 mt-1">Find and connect with fellow alumni.</p>
        </header>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name, company..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="lg:col-span-2 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
             <input
              type="text"
              name="industry"
              placeholder="Filter by industry..."
              value={filters.industry}
              onChange={handleFilterChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
            <input
              type="number"
              name="graduationYear"
              placeholder="Filter by year..."
              value={filters.graduationYear}
              onChange={handleFilterChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
             <input
              type="text"
              name="location"
              placeholder="Filter by location..."
              value={filters.location}
              onChange={handleFilterChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            />
             <button onClick={clearFilters} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Clear</button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map(user => (
            <Card key={user.id} className="text-center flex flex-col items-center">
              <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mb-4" />
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-brand-dark font-semibold">{user.profile.jobTitle}</p>
              <p className="text-gray-600">{user.profile.company}</p>
              <p className="text-sm text-gray-500 mt-1">{user.profile.degree}, {user.profile.graduationYear}</p>
              <Link to={`/profile/${user.id}`} className="mt-4 bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-dark transition-colors">
                View Profile
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Directory;
