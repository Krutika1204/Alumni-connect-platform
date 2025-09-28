import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Event } from '../types';
import Card from '../components/Card';

const EventDetailPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { user } = useAuth();
    const { events, toggleRsvp } = useData();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const foundEvent = events.find(e => e.id === parseInt(eventId || ''));
        setEvent(foundEvent || null);
    }, [eventId, events]);

    const handleRsvp = () => {
        if (!user || !event) return;
        toggleRsvp(event.id, user.id);
    };

    if (!event) {
        return <div className="p-8 text-center text-gray-600">Event not found.</div>;
    }
    
    const isRsvpd = user && event.rsvps.includes(user.id);

    return (
        <div className="p-4 md:p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                 <div className="mb-4">
                    <Link to="/events" className="text-brand-primary hover:underline">&larr; Back to all events</Link>
                </div>
                <Card>
                    {event.posterUrl && <img src={event.posterUrl} alt={event.title} className="w-full h-64 object-cover rounded-t-lg mb-6" />}
                    <div className="p-2">
                        <h1 className="text-3xl font-bold text-brand-dark mb-2">{event.title}</h1>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                            <span>📅 {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>⏰ {event.time}</span>
                            <span>📍 {event.location}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
                        
                        {event.guidelines && (
                            <div className="mb-6 p-4 bg-brand-light rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Event Guidelines</h2>
                                <p className="text-gray-600 whitespace-pre-wrap">{event.guidelines}</p>
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between border-t pt-4">
                            <div>
                                <span className="text-xl font-bold">{event.rsvps.length}</span>
                                <span className="text-gray-500 ml-2">Attending</span>
                            </div>
                            <button
                              onClick={handleRsvp}
                              className={`px-8 py-3 rounded-md font-semibold text-white transition-colors text-lg ${
                                isRsvpd
                                  ? 'bg-red-500 hover:bg-red-600'
                                  : 'bg-green-500 hover:bg-green-600'
                              }`}
                            >
                              {isRsvpd ? 'Cancel RSVP' : 'RSVP Now'}
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default EventDetailPage;
