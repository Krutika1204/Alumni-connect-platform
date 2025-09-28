import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MOCK_MENTORS } from '../data/mockData';
import Card from '../components/Card';
import { getCareerAdvice } from '../services/geminiService';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import { User, UserRole } from '../types';
import ChatWindow from '../components/ChatWindow';

const Mentorship: React.FC = () => {
  const { user } = useAuth();
  const { users, posts, requests, addRequest, meetings, getUserById } = useData();
  const [activeTab, setActiveTab] = useState('opportunities');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<User | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [chattingWith, setChattingWith] = useState<User | null>(null);

  const handleGetAdvice = async () => {
    if (!user) return;
    setIsLoading(true);
    setAdvice('');
    const result = await getCareerAdvice(user.profile);
    setAdvice(result);
    setIsLoading(false);
  };
  
  const handleRequestClick = (mentor: User) => {
      setSelectedMentor(mentor);
      setIsModalOpen(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user || !selectedMentor) return;
      addRequest({
          studentId: user.id,
          alumniId: selectedMentor.id,
          message: requestMessage
      });
      setIsModalOpen(false);
      setRequestMessage('');
  };
  
  const getRequestStatus = (alumniId: number) => {
      if (!user) return null;
      const existingRequest = requests.find(r => r.studentId === user.id && r.alumniId === alumniId);
      return existingRequest ? existingRequest.status : null;
  }

  const myMentors = useMemo(() => {
    if (!user) return [];
    const acceptedRequests = requests.filter(r => r.studentId === user.id && r.status === 'Accepted');
    return acceptedRequests.map(req => users.find(u => u.id === req.alumniId)).filter(Boolean) as User[];
  }, [requests, users, user]);

  const myMeetings = useMemo(() => {
    if (!myMentors.length) return [];
    const myMentorIds = myMentors.map(m => m.id);
    return meetings.filter(m => myMentorIds.includes(m.mentorId));
  }, [meetings, myMentors]);

  const renderAdvice = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(<ul key={`ul-${elements.length}`} className="space-y-1 my-2 list-disc pl-5">{listItems}</ul>);
            listItems = [];
        }
    };

    lines.forEach((line, i) => {
        if (line.startsWith('* ')) {
            listItems.push(<li key={`li-${i}`}>{line.replace('* ', '')}</li>);
        } else {
            flushList();
            if (line.startsWith('###')) {
                elements.push(<h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-brand-dark">{line.replace('###', '').trim()}</h3>);
            } else if (line.startsWith('##')) {
                elements.push(<h2 key={i} className="text-xl font-bold mt-4 mb-2 text-brand-primary">{line.replace('##', '').trim()}</h2>);
            } else {
                elements.push(<p key={i} className="my-2">{line}</p>);
            }
        }
    });
    flushList();
    return elements;
  };
  
  const studentTabs = user?.role === UserRole.Student ? [ { id: 'my-mentors', name: 'My Mentors' }] : [];
  const tabs = [
    { id: 'opportunities', name: 'Job Opportunities' },
    { id: 'find-mentors', name: 'Find a Mentor' },
    ...studentTabs,
  ];

  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mentorship & Career Portal</h1>
            <p className="text-gray-600 mt-1">Connect with mentors and discover new opportunities.</p>
          </header>

          <Card className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">AI Career Advisor</h2>
              <p className="text-gray-600 mt-1 mb-4">Get personalized career advice based on your profile using Gemini AI.</p>
              <button onClick={handleGetAdvice} disabled={isLoading} className="bg-brand-accent text-brand-dark font-bold py-2 px-4 rounded hover:opacity-90 disabled:opacity-50">
                  {isLoading ? 'Generating...' : 'Get My Advice'}
              </button>
              {isLoading && <Spinner />}
              {advice && (
                  <div className="mt-4 p-4 bg-brand-light rounded-md text-gray-700">
                      {renderAdvice(advice)}
                  </div>
              )}
          </Card>

          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
             {tabs.map(tab => (
                 <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
             ))}
          </nav>
        </div>

        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            {posts.filter(p => p.isJobPost).map(jobPost => {
                const poster = getUserById(jobPost.authorId);
                return (
                    <Card key={jobPost.id}>
                        <h3 className="font-bold text-lg text-brand-dark">{jobPost.jobDetails?.title} - <span className="font-normal text-gray-700">{jobPost.jobDetails?.company}</span></h3>
                        <p className="text-sm font-semibold text-brand-secondary">{jobPost.jobDetails?.type}</p>
                        <p className="mt-2 text-gray-600">{jobPost.content}</p>
                        <p className="mt-2 text-xs text-gray-500">Posted by {poster?.name}</p>
                    </Card>
                )
            })}
          </div>
        )}

        {activeTab === 'find-mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_MENTORS.map(mentor => {
              const alumni = users.find(u => u.id === mentor.alumniId);
              if (!alumni) return null;
              const requestStatus = getRequestStatus(alumni.id);

              return (
                <Card key={alumni.id} className="text-center">
                  <img src={alumni.avatarUrl} alt={alumni.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800">{alumni.name}</h3>
                  <p className="text-gray-600">{alumni.profile.jobTitle}</p>
                  <p className="text-sm text-gray-500">{alumni.profile.company}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700">Areas of Expertise:</h4>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {mentor.expertise.map(area => <span key={area} className="bg-brand-light text-brand-dark text-xs font-semibold px-2 py-1 rounded-full">{area}</span>)}
                    </div>
                  </div>
                  {user?.role === UserRole.Student && (
                      <button 
                        onClick={() => handleRequestClick(alumni)} 
                        disabled={!!requestStatus}
                        className="mt-4 w-full px-4 py-2 rounded-md font-semibold text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed bg-brand-primary hover:bg-brand-dark"
                      >
                          {requestStatus === 'Pending' ? 'Request Sent' : requestStatus === 'Accepted' ? 'Mentoring' : 'Request Mentorship'}
                      </button>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'my-mentors' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Mentors</h2>
                    {myMentors.length > 0 ? (
                        <div className="space-y-4">
                            {myMentors.map(m => 
                                <Card key={m.id} className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-lg">{m.name}</h3>
                                        <p className="text-gray-600">{m.profile.jobTitle}</p>
                                    </div>
                                    <button onClick={() => setChattingWith(m)} className="bg-brand-secondary text-white font-semibold px-4 py-2 rounded-md hover:bg-brand-dark">
                                        Chat
                                    </button>
                                </Card>
                            )}
                        </div>
                    ) : <p className="text-gray-500">You have no accepted mentors yet.</p>}
                </div>
                 <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Scheduled Meetings</h2>
                    {myMeetings.length > 0 ? (
                        <div className="space-y-4">
                            {myMeetings.map(m => (
                                <Card key={m.id}>
                                    <h3 className="font-bold text-brand-dark">{m.title}</h3>
                                    <p className="text-sm font-semibold">{new Date(m.date).toLocaleDateString()} at {m.time}</p>
                                    <p className="text-sm my-2 text-gray-600">{m.description}</p>
                                    <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Join Meeting</a>
                                </Card>
                            ))}
                        </div>
                    ): <p className="text-gray-500">No upcoming meetings scheduled by your mentors.</p>}
                </div>
            </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Send Mentorship Request to ${selectedMentor?.name}`}>
          <form onSubmit={handleSendRequest}>
              <p className="mb-4">Write a brief message about what you'd like to discuss.</p>
              <textarea
                value={requestMessage}
                onChange={e => setRequestMessage(e.target.value)}
                className="w-full border p-2 rounded"
                rows={5}
                required
                placeholder="Hi! I'm interested in learning about..."
              />
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-dark">Send Request</button>
              </div>
          </form>
      </Modal>
    </div>
    {chattingWith && <ChatWindow chatWithUser={chattingWith} onClose={() => setChattingWith(null)} />}
    </>
  );
};

export default Mentorship;
