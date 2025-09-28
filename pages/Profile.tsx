import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { User, Profile as ProfileType } from '../types';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const { getUserById, updateUserProfile } = useData();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileType | null>(null);

  useEffect(() => {
    const userToView = getUserById(parseInt(id || ''));
    if (userToView) {
      setProfileUser(userToView);
      setFormData(userToView.profile);
    }
  }, [id, getUserById]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(formData) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if(formData) {
        setFormData({ ...formData, contactInfo: { ...formData.contactInfo, [e.target.name]: e.target.value } });
    }
  }

  const handleSave = () => {
    if (profileUser && formData) {
      updateUserProfile(profileUser.id, formData);
      setProfileUser(prev => prev ? {...prev, profile: formData} : null);
      setIsEditing(false);
    }
  };

  if (!profileUser || !formData) {
    return <div className="p-8 text-center">User not found.</div>;
  }

  const canEdit = currentUser?.id === profileUser.id;

  const DetailItem: React.FC<{icon: React.ReactNode, label: string, value: React.ReactNode}> = ({icon, label, value}) => (
      <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-gray-500 mt-1">{icon}</div>
          <div>
              <h3 className="font-semibold text-gray-500 text-sm">{label}</h3>
              <p className="text-gray-800">{value}</p>
          </div>
      </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative">
            <div className="h-48 bg-brand-primary"></div>
            <div className="absolute top-24 left-1/2 -translate-x-1/2">
                <img src={profileUser.avatarUrl} alt={profileUser.name} className="w-40 h-40 rounded-full border-8 border-white shadow-lg" />
            </div>
            {canEdit && !isEditing && (
              <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 bg-white/80 text-gray-800 px-4 py-2 rounded-full shadow hover:bg-white font-semibold">
                Edit Profile
              </button>
            )}
          </div>
          <div className="pt-24 pb-12 px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-800">{profileUser.name}</h1>
            <p className="text-lg text-brand-secondary font-medium">{formData.jobTitle} at {formData.company}</p>
            <p className="text-md text-gray-500 mt-1">{formData.location}</p>
          </div>
          
          {!isEditing ? (
            <div className="px-6 pb-8">
              <div className="border-t border-gray-200 py-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">About Me</h2>
                <p className="text-gray-600 text-center md:text-left">{formData.bio}</p>
              </div>

              <div className="border-t border-gray-200 py-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <DetailItem icon={<IconBriefcase />} label="Industry" value={formData.industry} />
                  <DetailItem icon={<IconBuilding />} label="Company" value={formData.company} />
                  <DetailItem icon={<IconAcademicCap />} label="Degree" value={`${formData.degree}, ${formData.graduationYear}`} />
                  <DetailItem icon={<IconLink />} label="LinkedIn" value={<a href={`//${formData.contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.contactInfo.linkedin}</a>} />
                </div>
              </div>
            </div>
          ) : (
             <form className="px-6 pb-8 space-y-6 border-t border-gray-200 pt-6">
                <div>
                    <label className="font-semibold text-gray-700">Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="font-semibold text-gray-700">Degree</label><input name="degree" value={formData.degree} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/></div>
                    <div><label className="font-semibold text-gray-700">Graduation Year</label><input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/></div>
                    <div><label className="font-semibold text-gray-700">Company</label><input name="company" value={formData.company} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/></div>
                    <div><label className="font-semibold text-gray-700">Job Title</label><input name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/></div>
                    <div><label className="font-semibold text-gray-700">Industry</label><input name="industry" value={formData.industry} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/></div>
                    <div><label className="font-semibold text-gray-700">Location</label><input name="location" value={formData.location} onChange={handleInputChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary"/></div>
                    <div><label className="font-semibold text-gray-700">LinkedIn URL</label><input name="linkedin" value={formData.contactInfo.linkedin} onChange={handleContactChange} className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary" placeholder="linkedin.com/in/..." /></div>
                </div>
                 <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 font-semibold">Cancel</button>
                    <button type="button" onClick={handleSave} className="bg-brand-primary text-white px-6 py-2 rounded-md hover:bg-brand-dark font-semibold">Save Changes</button>
                </div>
              </form>
          )}
        </div>
      </div>
    </div>
  );
};


// SVG Icons for Profile Details
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconBuilding = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const IconAcademicCap = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>;
const IconLink = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;

export default Profile;
