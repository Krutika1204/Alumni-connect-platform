import { User, UserRole, Event, ForumPost, Mentor, FundraisingCampaign, MentorshipRequest, ChatMessage, MenteeMeeting, JobApplication } from '../types';

const DEFAULT_AVATAR_URL = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NkY2RjZCI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyYzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+PC9zdmc+`;

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'admin@university.edu',
    role: UserRole.Admin,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'Computer Science',
      graduationYear: 2010,
      company: 'University Corp',
      jobTitle: 'Platform Administrator',
      industry: 'Education',
      location: 'Mumbai, MH',
      contactInfo: { linkedin: 'linkedin.com/in/priyasharma' },
      bio: 'Managing the Alumni Connect Platform.'
    }
  },
  {
    id: 2,
    name: 'Aarav Patel',
    email: 'alice@example.com',
    role: UserRole.Alumni,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'MBA',
      graduationYear: 2015,
      company: 'Innovate India',
      jobTitle: 'Senior Product Manager',
      industry: 'Technology',
      location: 'Bengaluru, KA',
      contactInfo: { linkedin: 'linkedin.com/in/aaravpatel' },
      bio: 'Passionate about building products that users love. Happy to mentor students interested in tech.'
    }
  },
  {
    id: 3,
    name: 'Meera Krishnan',
    email: 'bob@example.com',
    role: UserRole.Alumni,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'Fine Arts',
      graduationYear: 2018,
      company: 'Creative Designs',
      jobTitle: 'Graphic Designer',
      industry: 'Design',
      location: 'Chennai, TN',
      contactInfo: { linkedin: 'linkedin.com/in/meerakrishnan' },
      bio: 'Creating beautiful and intuitive designs. Currently exploring UI/UX.'
    }
  },
  {
    id: 4,
    name: 'Rohan Gupta',
    email: 'charlie@university.edu',
    role: UserRole.Student,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'Computer Science',
      graduationYear: 2025,
      company: '',
      jobTitle: '',
      industry: '',
      location: 'Delhi, DL',
      contactInfo: {},
      bio: 'Current student seeking internships in software development. Eager to learn from experienced alumni.'
    }
  },
   {
    id: 5,
    name: 'Ananya Desai',
    email: 'diana@example.com',
    role: UserRole.Alumni,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'International Relations',
      graduationYear: 2012,
      company: 'Global Foundation',
      jobTitle: 'Program Director',
      industry: 'Non-profit',
      location: 'Pune, MH',
      contactInfo: { linkedin: 'linkedin.com/in/ananyadesai' },
      bio: 'Working to make a positive impact in the world through sustainable development programs.'
    }
  },
  {
    id: 6,
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    role: UserRole.Alumni,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'Mechanical Engineering',
      graduationYear: 2014,
      company: 'AutoWorks',
      jobTitle: 'Lead Engineer',
      industry: 'Automotive',
      location: 'Gurgaon, HR',
      contactInfo: { linkedin: 'linkedin.com/in/vikramsingh' },
      bio: 'Specializing in automotive design and manufacturing processes.'
    }
  },
  {
    id: 7,
    name: 'Sunita Reddy',
    email: 'sunita@example.com',
    role: UserRole.Alumni,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
      degree: 'Economics',
      graduationYear: 2016,
      company: 'FinanceFirst Bank',
      jobTitle: 'Financial Analyst',
      industry: 'Finance',
      location: 'Hyderabad, TS',
      contactInfo: { linkedin: 'linkedin.com/in/sunitareddy' },
      bio: 'Analyzing market trends and providing financial insights.'
    }
  },
  {
    id: 8,
    name: 'Kavya Iyer',
    email: 'kavya@university.edu',
    role: UserRole.Student,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
        degree: 'International Relations',
        graduationYear: 2026,
        company: '',
        jobTitle: '',
        industry: '',
        location: 'Pune, MH',
        contactInfo: {},
        bio: 'Aspiring diplomat, passionate about global affairs and sustainable development.'
    }
  },
  {
    id: 9,
    name: 'Siddharth Rao',
    email: 'sid@university.edu',
    role: UserRole.Student,
    avatarUrl: DEFAULT_AVATAR_URL,
    profile: {
        degree: 'MBA',
        graduationYear: 2025,
        company: '',
        jobTitle: '',
        industry: '',
        location: 'Bengaluru, KA',
        contactInfo: {},
        bio: 'MBA candidate focusing on tech product management. Looking to connect with industry leaders.'
    }
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Annual Alumni Reunion 2024',
    date: '2024-10-26',
    time: '6:00 PM',
    location: 'University Grand Hall',
    description: 'Join us for our biggest event of the year! Reconnect with old friends, network with fellow professionals, and enjoy an evening of food, music, and memories. This is the perfect opportunity to see how much the campus has grown and to catch up with your favorite professors.',
    rsvps: [2, 3, 5],
    posterUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
    guidelines: 'Dress Code: Smart Casual. Please bring your alumni ID card for faster check-in. Parking is available at the north campus lot. All guests must be 21 or older.'
  },
  {
    id: 2,
    title: 'Webinar: AI in the Tech Industry',
    date: '2024-11-15',
    time: '12:00 PM',
    location: 'Virtual (Zoom)',
    description: 'A deep dive into the latest AI trends, hosted by industry expert Aarav Patel (MBA \'15). This session will cover the impact of generative AI, machine learning advancements, and the future of AI in product management. There will be a Q&A session at the end.',
    rsvps: [2, 7],
    posterUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
    guidelines: 'This is a virtual event hosted on Zoom. A link will be sent to all registered attendees 24 hours before the event. Please ensure your Zoom client is updated. The session will be recorded and made available to all alumni after the event.'
  },
  {
    id: 3,
    title: 'Diwali Celebration Gala',
    date: '2024-11-01',
    time: '7:00 PM',
    location: 'The Palace Ballroom',
    description: 'Celebrate the festival of lights with fellow alumni, featuring cultural performances, a traditional Indian dinner, and a DJ. It\'s a night of joy, celebration, and community.',
    rsvps: [2, 3, 5, 6, 7],
    posterUrl: 'https://images.unsplash.com/photo-1604207937745-33993a7a4a03?q=80&w=1974&auto=format&fit=crop',
    guidelines: 'Dress Code: Traditional or Formal Attire. Tickets include dinner and two drinks. Additional drinks can be purchased at the bar. All proceeds from the event will go to the Student Scholarship Fund.'
  },
  {
    id: 4,
    title: 'Startup Conclave 2024',
    date: '2024-12-05',
    time: '9:00 AM',
    location: 'Innovation Hub Auditorium',
    description: 'A full-day event for aspiring entrepreneurs. Network with alumni founders and venture capitalists. The day includes keynote speeches, panel discussions on fundraising, and a startup pitch competition.',
    rsvps: [2, 6, 7],
    posterUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop',
    guidelines: 'Registration begins at 8:30 AM. Lunch and refreshments will be provided. Please bring business cards for networking. The pitch competition finale will be at 4:00 PM.'
  }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
    {
        id: 1,
        channelId: 'job-openings',
        authorId: 2,
        content: 'My team at Innovate India is hiring a Junior Product Manager. Great opportunity for a recent grad!',
        timestamp: '2024-09-10T14:48:00.000Z',
        replies: [
            { id: 1, authorId: 4, content: 'Thanks for sharing, Aarav! I\'m very interested.', timestamp: '2024-09-10T15:12:00.000Z' }
        ],
        isJobPost: true,
        jobDetails: {
            title: 'Junior Product Manager',
            company: 'Innovate India',
            type: 'Full-time'
        }
    },
    {
        id: 2,
        channelId: 'industry-trends',
        authorId: 3,
        content: 'Has anyone else noticed the huge shift towards minimalist design in web UI this year? What are your thoughts?',
        timestamp: '2024-09-11T09:20:00.000Z',
        replies: []
    },
    {
        id: 3,
        channelId: 'job-openings',
        authorId: 5,
        content: 'We have an opening for a Program Coordinator Intern at Global Foundation. It\'s a great chance to get hands-on experience in the non-profit sector.',
        timestamp: '2024-09-12T11:00:00.000Z',
        replies: [],
        isJobPost: true,
        jobDetails: {
            title: 'Program Coordinator Intern',
            company: 'Global Foundation',
            type: 'Internship'
        }
    }
];


export const MOCK_MENTORS: Mentor[] = [
    { alumniId: 2, expertise: ['Product Management', 'Tech Industry', 'Career Growth'] },
    { alumniId: 3, expertise: ['Graphic Design', 'UI/UX', 'Freelancing'] },
    { alumniId: 5, expertise: ['Non-profit Management', 'International Development'] },
    { alumniId: 6, expertise: ['Automotive Engineering', 'Manufacturing', 'Project Management'] },
    { alumniId: 7, expertise: ['Financial Analysis', 'Investment Banking', 'Market Research'] }
];

export const MOCK_CAMPAIGNS: FundraisingCampaign[] = [
    {
        id: 1,
        title: 'New Engineering Lab Equipment',
        goal: 50000,
        raised: 27500,
        description: 'Help us equip our future engineers with state-of-the-art technology for hands-on learning.'
    },
    {
        id: 2,
        title: 'Student Scholarship Fund',
        goal: 100000,
        raised: 85000,
        description: 'Support deserving students and ensure that financial barriers don\'t stand in the way of a great education.'
    }
];

export const MOCK_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: 1,
    studentId: 4,
    alumniId: 2,
    message: "Hi Aarav, I'm a CS student very interested in product management. I'd love to hear about your journey and get some advice on breaking into the field. Thanks!",
    status: 'Pending'
  },
  {
    id: 2,
    studentId: 8,
    alumniId: 5,
    message: "Hello Ananya, your work at the Global Foundation is inspiring! I'm studying IR and would be grateful for your mentorship.",
    status: 'Pending'
  },
  {
    id: 3,
    studentId: 9,
    alumniId: 2,
    message: "Hi Aarav, I'm an MBA student focusing on tech. Your profile is exactly what I aspire to. I have accepted your mentorship.",
    status: 'Accepted'
  },
  {
    id: 4,
    studentId: 4,
    alumniId: 6,
    message: "Hey Vikram, I'm Rohan. I have accepted your mentorship.",
    status: 'Accepted'
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    { id: 1, senderId: 6, receiverId: 4, content: "Welcome, Rohan! Glad to have you as a mentee. Let me know what you'd like to discuss first.", timestamp: "2024-09-12T10:00:00.000Z"},
    { id: 2, senderId: 4, receiverId: 6, content: "Thanks, Vikram! I'm really interested in learning more about project management in the automotive industry.", timestamp: "2024-09-12T10:05:00.000Z"},
];

export const MOCK_MENTEE_MEETINGS: MenteeMeeting[] = [
    { 
        id: 1, 
        mentorId: 6, 
        title: "Introductory Session: Automotive PM",
        date: "2024-10-15",
        time: "11:00 AM",
        link: "https://meet.google.com/xyz-abc-def",
        description: "A get-to-know-you session for all my mentees. We'll discuss career paths in automotive engineering and project management."
    }
];

export const MOCK_JOB_APPLICATIONS: JobApplication[] = [];
