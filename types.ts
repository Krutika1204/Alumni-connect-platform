export enum UserRole {
  Alumni = 'Alumni',
  Student = 'Student',
  Admin = 'Admin',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  profile: Profile;
}

export interface Profile {
  degree: string;
  graduationYear: number;
  company: string;
  jobTitle: string;
  industry: string;
  location: string;
  contactInfo: {
    phone?: string;
    linkedin?: string;
  };
  bio: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvps: number[]; // array of user ids
  posterUrl?: string;
  guidelines?: string;
}

export interface ForumPost {
  id: number;
  channelId: string;
  authorId: number;
  content: string;
  timestamp: string;
  replies: ForumReply[];
  isJobPost?: boolean;
  jobDetails?: {
    title: string;
    company: string;
    type: 'Internship' | 'Full-time';
  };
}

export interface ForumReply {
  id: number;
  authorId: number;
  content: string;
  timestamp: string;
}

export interface JobApplication {
    id: number;
    postId: number;
    studentId: number;
    name: string;
    education: string;
    coverLetter: string;
    cvFileName: string;
    timestamp: string;
}

export interface Mentor {
  alumniId: number;
  expertise: string[];
}

export interface FundraisingCampaign {
  id: number;
  title: string;
  goal: number;
  raised: number;
  description: string;
}

export interface MentorshipRequest {
  id: number;
  studentId: number;
  alumniId: number;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

export interface MenteeMeeting {
  id: number;
  mentorId: number;
  title: string;
  date: string;
  time: string;
  link: string;
  description: string;
}
