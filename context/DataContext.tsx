import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Event, ForumPost, FundraisingCampaign, MentorshipRequest, ChatMessage, MenteeMeeting, JobApplication, Profile } from '../types';
import { MOCK_USERS, MOCK_EVENTS, MOCK_FORUM_POSTS, MOCK_CAMPAIGNS, MOCK_MENTORSHIP_REQUESTS, MOCK_CHAT_MESSAGES, MOCK_MENTEE_MEETINGS, MOCK_JOB_APPLICATIONS } from '../data/mockData';

interface DataContextType {
  users: User[];
  events: Event[];
  posts: ForumPost[];
  campaigns: FundraisingCampaign[];
  requests: MentorshipRequest[];
  messages: ChatMessage[];
  meetings: MenteeMeeting[];
  jobApplications: JobApplication[];
  getUserById: (id: number) => User | undefined;
  toggleRsvp: (eventId: number, userId: number) => { isRsvping: boolean };
  addEvent: (event: Omit<Event, 'id' | 'rsvps'>) => void;
  addPost: (post: Omit<ForumPost, 'id'| 'replies' | 'timestamp'>) => void;
  addCampaign: (campaign: Omit<FundraisingCampaign, 'id' | 'raised'>) => void;
  makeDonation: (campaignId: number, amount: number) => void;
  updateRequestStatus: (requestId: number, status: 'Accepted' | 'Declined') => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  addMeeting: (meeting: Omit<MenteeMeeting, 'id'>) => void;
  addRequest: (request: Omit<MentorshipRequest, 'id' | 'status'>) => void;
  addJobApplication: (application: Omit<JobApplication, 'id' | 'timestamp'>) => void;
  updateUserProfile: (userId: number, profile: Profile) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>(MOCK_CAMPAIGNS);
  const [requests, setRequests] = useState<MentorshipRequest[]>(MOCK_MENTORSHIP_REQUESTS);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [meetings, setMeetings] = useState<MenteeMeeting[]>(MOCK_MENTEE_MEETINGS);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(MOCK_JOB_APPLICATIONS);

  const getUserById = (id: number) => users.find(u => u.id === id);

  const toggleRsvp = (eventId: number, userId: number) => {
    let isRsvping = false;
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          const rsvpd = event.rsvps.includes(userId);
          isRsvping = !rsvpd;
          const newRsvps = rsvpd
            ? event.rsvps.filter(id => id !== userId)
            : [...event.rsvps, userId];
          return { ...event, rsvps: newRsvps };
        }
        return event;
      })
    );
    return { isRsvping };
  };

  const addEvent = (eventData: Omit<Event, 'id' | 'rsvps'>) => {
    const newEvent: Event = { ...eventData, id: Date.now(), rsvps: [] };
    setEvents(prev => [newEvent, ...prev]);
  };

  const addPost = (postData: Omit<ForumPost, 'id' | 'replies' | 'timestamp'>) => {
    const newPost: ForumPost = { ...postData, id: Date.now(), replies: [], timestamp: new Date().toISOString() };
    setPosts(prev => [newPost, ...prev]);
  };

  const addCampaign = (campaignData: Omit<FundraisingCampaign, 'id' | 'raised'>) => {
    const newCampaign: FundraisingCampaign = { ...campaignData, id: Date.now(), raised: 0 };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const makeDonation = (campaignId: number, amount: number) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, raised: c.raised + amount } : c));
  };
  
  const updateRequestStatus = (requestId: number, status: 'Accepted' | 'Declined') => {
    setRequests(prev => prev.map(r => (r.id === requestId ? { ...r, status } : r)));
  };

  const addMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = { ...messageData, id: Date.now(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, newMessage]);
  };

  const addMeeting = (meetingData: Omit<MenteeMeeting, 'id'>) => {
    const newMeeting: MenteeMeeting = { ...meetingData, id: Date.now() };
    setMeetings(prev => [newMeeting, ...prev]);
  };

  const addRequest = (requestData: Omit<MentorshipRequest, 'id' | 'status'>) => {
    const newRequest: MentorshipRequest = { ...requestData, id: Date.now(), status: 'Pending' };
    setRequests(prev => [...prev, newRequest]);
  };

  const addJobApplication = (applicationData: Omit<JobApplication, 'id' | 'timestamp'>) => {
      const newApplication: JobApplication = { ...applicationData, id: Date.now(), timestamp: new Date().toISOString() };
      setJobApplications(prev => [...prev, newApplication]);
  };
  
  const updateUserProfile = (userId: number, profile: Profile) => {
      setUsers(prev => prev.map(u => u.id === userId ? {...u, profile} : u));
  };

  return (
    <DataContext.Provider value={{ 
        users, events, posts, campaigns, requests, messages, meetings, jobApplications,
        getUserById, toggleRsvp, addEvent, addPost, addCampaign, makeDonation,
        updateRequestStatus, addMessage, addMeeting, addRequest, addJobApplication,
        updateUserProfile
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
