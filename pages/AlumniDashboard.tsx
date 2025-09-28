import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { User } from '../types';
import ChatWindow from '../components/ChatWindow';

const AlumniDashboard: React.FC = () => {
  const { user } = useAuth();
  const { requests, meetings, updateRequestStatus, addMeeting, getUserById } = useData();
  
  const [chattingWith, setChattingWith] = useState<User | null>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', link: '', description: ''});

  const pendingRequests = useMemo(() => {
    return requests.filter(r => r.alumniId === user?.id && r.status === 'Pending');
  }, [requests, user]);

  const myMentees = useMemo(() => {
    const menteeIds = requests
      .filter(r => r.alumniId === user?.id && r.status === 'Accepted')
      .map(r => r.studentId);
    return menteeIds.map(id => getUserById(id)).filter((u): u is User => !!u);
  }, [requests, user, getUserById]);

  const handleRequest = (requestId: number, newStatus: 'Accepted' | 'Declined') => {
    updateRequestStatus(requestId, newStatus);
  };
  
  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if(!user) return;
    addMeeting({
        mentorId: user.id,
        ...newMeeting
    });
    setIsMeetingModalOpen(false);
    setNewMeeting({ title: '', date: '', time: '', link: '', description: ''});
  }

  if (!user) return null;

  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mentor Hub</h1>
            <p className="text-gray-600 mt-1">Manage your mentorship activities.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {/* Mentorship Requests */}
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">Mentorship Requests</h2>
                  {pendingRequests.length > 0 && (
                   <span className="bg-brand-accent text-brand-dark text-xs font-bold px-2 py-1 rounded-full">
                        {pendingRequests.length} New
                    </span>
                  )}
                </div>
                {pendingRequests.length > 0 ? (
                  <ul className="space-y-4">
                    {pendingRequests.map(req => {
                      const student = getUserById(req.studentId);
                      return (
                        <li key={req.id} className="p-3 bg-gray-50 rounded-md shadow-sm">
                          <p className="font-bold">{student?.name}</p>
                          <p className="text-sm text-gray-600 my-2 italic">"{req.message}"</p>
                          <div className="flex justify-end space-x-2 mt-2">
                            <button onClick={() => handleRequest(req.id, 'Accepted')} className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">Accept</button>
                            <button onClick={() => handleRequest(req.id, 'Declined')} className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600">Decline</button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500">No new mentorship requests.</p>
                )}
              </Card>

              {/* My Mentees */}
              <Card>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">My Mentees</h2>
                  {myMentees.length > 0 ? (
                      <ul className="space-y-2">
                          {myMentees.map(mentee => (
                             <li key={mentee.id}>
                                <button onClick={() => setChattingWith(mentee)} className={`w-full text-left p-2 rounded flex items-center space-x-3 ${chattingWith?.id === mentee.id ? 'bg-brand-light' : 'hover:bg-gray-100'}`}>
                                    <img src={mentee.avatarUrl} alt={mentee.name} className="w-8 h-8 rounded-full" />
                                    <span className="font-medium text-brand-dark">{mentee.name}</span>
                                </button>
                             </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">You currently have no mentees.</p>
                )}
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Group Meetings */}
              <Card>
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-700">Group Meetings for Mentees</h2>
                      <button onClick={() => setIsMeetingModalOpen(true)} className="bg-brand-accent text-brand-dark font-bold py-2 px-4 rounded-md hover:opacity-90">
                          Create Meeting
                      </button>
                  </div>
                 {meetings.filter(m => m.mentorId === user.id).length > 0 ? (
                    <ul className="space-y-4">
                        {meetings.filter(m => m.mentorId === user.id).map(m => (
                            <li key={m.id} className="p-3 bg-brand-light rounded-md border border-brand-secondary/20">
                                <h3 className="font-bold text-brand-dark">{m.title}</h3>
                                <p className="text-sm font-semibold">{new Date(m.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {m.time}</p>
                                <p className="text-sm my-2 text-gray-700">{m.description}</p>
                                <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">Join Meeting</a>
                            </li>
                        ))}
                    </ul>
                 ) : (
                    <p className="text-gray-500 text-center py-4">You have not scheduled any group meetings.</p>
                 )}
              </Card>
               <Card>
                 <div className="text-center p-10 text-gray-500">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Chat with your Mentees</h2>
                    <p>Select a mentee from the "My Mentees" list to start a conversation. The chat window will appear at the bottom of your screen.</p>
                 </div>
               </Card>
            </div>
          </div>
        </div>
        <Modal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} title="Create Group Meeting">
            <form onSubmit={handleCreateMeeting} className="space-y-4">
                  <input name="title" value={newMeeting.title} onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})} placeholder="Meeting Title" className="w-full border p-2 rounded" required />
                  <div className="grid grid-cols-2 gap-4">
                      <input name="date" type="date" value={newMeeting.date} onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})} className="w-full border p-2 rounded" required min={new Date().toISOString().split("T")[0]}/>
                      <input name="time" type="time" value={newMeeting.time} onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})} className="w-full border p-2 rounded" required />
                  </div>
                  <input name="link" value={newMeeting.link} onChange={(e) => setNewMeeting({...newMeeting, link: e.target.value})} placeholder="Virtual Meeting Link" className="w-full border p-2 rounded" required />
                  <textarea name="description" value={newMeeting.description} onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})} placeholder="Description/Agenda" className="w-full border p-2 rounded" rows={3} required></textarea>
                  <div className="flex justify-end">
                      <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-brand-dark">Schedule Meeting</button>
                  </div>
            </form>
        </Modal>
      </div>
      {chattingWith && <ChatWindow chatWithUser={chattingWith} onClose={() => setChattingWith(null)} />}
    </>
  );
};

export default AlumniDashboard;
