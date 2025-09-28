import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const IconBell = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const IconChat = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-brand-dark text-white'
        : 'text-gray-300 hover:bg-brand-secondary hover:text-white'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? 'bg-brand-dark text-white'
        : 'text-gray-300 hover:bg-brand-secondary hover:text-white'
    }`;

  if (!user) return null;

  return (
    <nav className="bg-brand-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">AlumniConnect</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass} end>Dashboard</NavLink>
                <NavLink to="/events" className={navLinkClass}>Events</NavLink>
                <NavLink to={user.role === UserRole.Alumni ? "/alumni-dashboard" : "/mentorship"} className={navLinkClass}>Mentorship</NavLink>
                <NavLink to="/fundraising" className={navLinkClass}>Fundraising</NavLink>
                <NavLink to="/directory" className={navLinkClass}>Networking</NavLink>
                {user.role === UserRole.Admin && (
                  <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
               <button className="p-1 rounded-full text-gray-300 hover:text-white focus:outline-none">
                  <span className="sr-only">View messages</span>
                  <IconChat />
              </button>
              <button className="p-1 rounded-full text-gray-300 hover:text-white focus:outline-none">
                  <span className="sr-only">View notifications</span>
                  <IconBell />
              </button>
              
              <div className="relative">
                <div>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <NavLink to={`/profile/${user.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NavLink>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-brand-secondary inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink to="/" className={mobileNavLinkClass} end>Dashboard</NavLink>
             <NavLink to="/events" className={mobileNavLinkClass}>Events</NavLink>
             <NavLink to={user.role === UserRole.Alumni ? "/alumni-dashboard" : "/mentorship"} className={mobileNavLinkClass}>Mentorship</NavLink>
             <NavLink to="/fundraising" className={mobileNavLinkClass}>Fundraising</NavLink>
             <NavLink to="/directory" className={mobileNavLinkClass}>Networking</NavLink>
             {user.role === UserRole.Admin && (
              <NavLink to="/admin" className={mobileNavLinkClass}>Admin</NavLink>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-brand-secondary">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
              </div>
               <div className="ml-auto flex items-center space-x-2">
                 <button className="p-1 rounded-full text-gray-300 hover:text-white focus:outline-none">
                    <span className="sr-only">View messages</span>
                    <IconChat />
                </button>
                <button className="p-1 rounded-full text-gray-300 hover:text-white focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <IconBell />
                </button>
               </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <NavLink to={`/profile/${user.id}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-brand-secondary">Profile</NavLink>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-brand-secondary">Settings</a>
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-brand-secondary">Logout</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
