import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Event, UserRole } from '../types';
import Card from '../components/Card';
import Modal from '../components/Modal';

const Events: React.FC = () => {
  const { user } = useAuth();
  const { events, addEvent, toggleRsvp } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
      title: '', date: '', time: '', location: '', description: ''
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info'; eventId: number | null }>({
    message: '',
    type: 'success',
    eventId: null,
  });

  const handleRsvp = (eventId: number) => {
    if (!user) return;
    const { isRsvping } = toggleRsvp(eventId, user.id);

    setNotification({
        message: isRsvping ? 'You are registered!' : 'Your registration is cancelled.',
        type: isRsvping ? 'success' : 'info',
        eventId: eventId,
    });

    setTimeout(() => {
        setNotification({ message: '', type: 'success', eventId: null });
    }, 3000);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewEvent({...newEvent, [e.target.name]: e.target.value});
  }

  const handleCreateEvent = (e: React.FormEvent) => {
      e.preventDefault();
      addEvent(newEvent);
      setIsModalOpen(false);
      setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
            <p className="text-gray-600 mt-1">Stay connected with university gatherings, webinars, and more.</p>
          </div>
          {user?.role === UserRole.Admin && (
              <button onClick={() => setIsModalOpen(true)} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-dark transition-colors">
                  Create Event
              </button>
          )}
        </header>

        <div className="space-y-6">
          {events.map(event => (
            <Card key={event.id} className="relative overflow-hidden">
               {notification.eventId === event.id && (
                <div
                  className={`absolute top-0 right-0 text-white text-sm font-semibold px-4 py-2 rounded-bl-lg shadow-md transition-opacity duration-300 ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                >
                  {notification.message}
                </div>
              )}
              <div className="md:flex justify-between items-start">
                  <div className="flex-grow">
                    <Link to={`/events/${event.id}`} className="block hover:bg-gray-50 -m-6 p-6 rounded-lg">
                      <h2 className="text-xl font-bold text-brand-dark group-hover:underline">{event.title}</h2>
                      <p className="text-gray-600 font-semibold">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ {event.time}</p>
                      <p className="text-gray-500">{event.location}</p>
                      <p className="mt-2 text-gray-700 truncate">{event.description}</p>
                    </Link>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 text-center flex-shrink-0 z-10 relative">
                      <p className="text-2xl font-bold">{event.rsvps.length}</p>
                      <p className="text-gray-500">Attending</p>
                       <button
                          onClick={() => handleRsvp(event.id)}
                          className={`mt-2 w-full px-6 py-2 rounded-md font-semibold text-white transition-colors ${
                            user && event.rsvps.includes(user.id)
                              ? 'bg-red-500 hover:bg-red-600'
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          {user && event.rsvps.includes(user.id) ? 'Cancel RSVP' : 'RSVP'}
                        </button>
                  </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Event">
        <form onSubmit={handleCreateEvent} className="space-y-4">
            <input name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" className="w-full border p-2 rounded" required />
            <div className="grid grid-cols-2 gap-4">
                <input name="date" type="date" value={newEvent.date} onChange={handleInputChange} className="w-full border p-2 rounded" required />
                <input name="time" type="time" value={newEvent.time} onChange={handleInputChange} className="w-full border p-2 rounded" required />
            </div>
            <input name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location or Virtual Link" className="w-full border p-2 rounded" required />
            <textarea name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Event Description" className="w-full border p-2 rounded" rows={4} required></textarea>
            <div className="flex justify-end">
                <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-brand-dark">Create</button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Events;
