import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ForumPost, UserRole } from '../types';
import Card from '../components/Card';
import Modal from '../components/Modal';

const channels = [
  { id: 'job-openings', name: 'Job Openings' },
  { id: 'industry-trends', name: 'Industry Trends' },
  { id: 'regional-meetups', name: 'Regional Meetups' },
  { id: 'general', name: 'General Discussion' },
];

const Forums: React.FC = () => {
  const { user } = useAuth();
  const { posts, addPost, getUserById, addJobApplication } = useData();
  const [activeChannel, setActiveChannel] = useState('job-openings');
  const [newPostContent, setNewPostContent] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [applicationData, setApplicationData] = useState({ name: user?.name || '', education: '', coverLetter: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [applicationStatus, setApplicationStatus] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;
    addPost({
      channelId: activeChannel,
      authorId: user.id,
      content: newPostContent,
    });
    setNewPostContent('');
  };
  
  const handleApplyClick = (post: ForumPost) => {
    setSelectedPost(post);
    setIsApplyModalOpen(true);
  };
  
  const handleApplicationSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user || !selectedPost || !cvFile) return;

      addJobApplication({
          postId: selectedPost.id,
          studentId: user.id,
          name: applicationData.name,
          education: applicationData.education,
          coverLetter: applicationData.coverLetter,
          cvFileName: cvFile.name,
      });
      
      setApplicationStatus('Your application has been submitted successfully!');
      setTimeout(() => {
          setIsApplyModalOpen(false);
          setSelectedPost(null);
          setApplicationStatus('');
          setApplicationData({ name: user.name, education: '', coverLetter: '' });
          setCvFile(null);
      }, 3000);
  }

  const activePosts = posts.filter(p => p.channelId === activeChannel);
  const canPostInJobs = user?.role === UserRole.Alumni;

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Discussion Forums</h1>
          <p className="text-gray-600 mt-1">Connect with the community on various topics.</p>
        </header>

        <div className="md:flex md:space-x-6">
          <aside className="md:w-1/4 mb-6 md:mb-0">
            <Card>
              <h2 className="text-lg font-semibold mb-3">Channels</h2>
              <ul>
                {channels.map(channel => (
                  <li key={channel.id}>
                    <button
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full text-left p-2 rounded ${
                        activeChannel === channel.id ? 'bg-brand-light font-bold text-brand-primary' : 'hover:bg-gray-100'
                      }`}
                    >
                      # {channel.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
          
          <main className="md:w-3/4">
             {activeChannel === 'job-openings' && !canPostInJobs ? (
              <Card className="mb-6 text-center">
                <p className="text-gray-600 font-medium">Only alumni are permitted to post in the Job Openings channel.</p>
              </Card>
            ) : (
              <Card className="mb-6">
                <form onSubmit={handlePostSubmit}>
                  <textarea
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    placeholder={`Share something in #${activeChannel}...`}
                    className="w-full border p-2 rounded-md"
                    rows={3}
                  />
                  <div className="text-right mt-2">
                    <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-brand-dark">
                      Post
                    </button>
                  </div>
                </form>
              </Card>
            )}

            <div className="space-y-4">
              {activePosts.length > 0 ? activePosts.map(post => {
                const author = getUserById(post.authorId);
                return (
                  <Card key={post.id}>
                    <div className="flex items-start space-x-4">
                      <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full bg-gray-200" />
                      <div className="flex-grow">
                        <div className="flex items-baseline space-x-2">
                          <p className="font-bold text-gray-800">{author?.name}</p>
                          <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                        </div>
                        {post.isJobPost && post.jobDetails && (
                            <div className="my-2 p-3 bg-gray-50 rounded-md border">
                                <h4 className="font-bold text-lg text-brand-dark">{post.jobDetails.title}</h4>
                                <p className="font-semibold">{post.jobDetails.company} - <span className="font-normal text-gray-600">{post.jobDetails.type}</span></p>
                            </div>
                        )}
                        <p className="mt-1 text-gray-700">{post.content}</p>
                        {user?.role === UserRole.Student && post.isJobPost && (
                            <div className="text-right mt-2">
                                <button onClick={() => handleApplyClick(post)} className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600">
                                    Apply Now
                                </button>
                            </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              }) : (
                <Card>
                    <p className="text-center text-gray-500">No posts in this channel yet. Be the first to start a discussion!</p>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title={`Apply for ${selectedPost?.jobDetails?.title}`}>
          {applicationStatus ? (
              <div className="text-center p-4">
                  <p className="text-lg font-semibold text-green-600">{applicationStatus}</p>
              </div>
          ) : (
            <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                    <label className="font-semibold">Full Name</label>
                    <input type="text" value={applicationData.name} onChange={e => setApplicationData({...applicationData, name: e.target.value})} className="w-full border p-2 rounded mt-1" required />
                </div>
                <div>
                    <label className="font-semibold">Education (e.g., B.Tech in CS, 2025)</label>
                    <input type="text" value={applicationData.education} onChange={e => setApplicationData({...applicationData, education: e.target.value})} className="w-full border p-2 rounded mt-1" required />
                </div>
                <div>
                    <label className="font-semibold">Cover Letter</label>
                    <textarea value={applicationData.coverLetter} onChange={e => setApplicationData({...applicationData, coverLetter: e.target.value})} className="w-full border p-2 rounded mt-1" rows={4} required />
                </div>
                 <div>
                    <label className="font-semibold">Upload CV (PDF)</label>
                    <input type="file" accept=".pdf" onChange={e => setCvFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm mt-1" required />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded hover:bg-brand-dark">Submit Application</button>
                </div>
            </form>
          )}
      </Modal>
    </div>
  );
};

export default Forums;
