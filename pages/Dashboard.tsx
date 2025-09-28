import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/Card';

// --- SVG Icons for Stats ---
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconGift = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>;

const StatCard: React.FC<{ value: string | number; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
    <Card className="flex items-center p-4">
        <div className="p-3 rounded-full bg-brand-light text-brand-primary mr-4">
            {icon}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    </Card>
);


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { events, posts, getUserById } = useData();

  if (!user) {
    return null;
  }
  
  const eventsJoined = events.filter(e => e.rsvps.includes(user.id)).length;
  const connections = 25; // Mock data
  const donationsMade = 3; // Mock data

  const latestEvent = events[0];
  const latestPost = posts[0];
  const postAuthor = latestPost ? getUserById(latestPost.authorId) : null;

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">👋 Welcome back, {user.name}!</h1>
          <p className="text-xl text-gray-500 mt-2">“Stay connected with your institution and peers.”</p>
        </header>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard value={connections} label="Connections" icon={<IconUsers />} />
            <StatCard value={eventsJoined} label="Events Joined" icon={<IconCalendar />} />
            <StatCard value={donationsMade} label="Donations Made" icon={<IconGift />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Event */}
          {latestEvent && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Event</h2>
              <div className="border-t pt-4">
                  <h3 className="font-bold text-lg text-brand-dark">{latestEvent.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(latestEvent.date).toLocaleDateString()} at {latestEvent.time}</p>
                  <p className="mt-2 text-gray-600">{latestEvent.location}</p>
                  <Link to={`/events/${latestEvent.id}`} className="inline-block mt-4 bg-brand-accent text-brand-dark font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">View Details</Link>
              </div>
            </Card>
          )}
          
          {/* Recent Forum Post */}
          {latestPost && postAuthor && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Latest Discussion</h2>
              <div className="border-t pt-4">
                  <div className="flex items-center mb-2">
                      <img src={postAuthor.avatarUrl} alt={postAuthor.name} className="w-8 h-8 rounded-full mr-3"/>
                      <span className="font-semibold text-gray-800">{postAuthor.name}</span>
                  </div>
                  <p className="text-gray-600 italic">"{latestPost.content}"</p>
                  <Link to="/forums" className="inline-block mt-4 bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">Join Discussion</Link>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
