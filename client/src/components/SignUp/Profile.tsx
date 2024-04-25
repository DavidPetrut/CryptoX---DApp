import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileImage from './ProfileImage'; 
import { useLocation } from 'react-router-dom';
import SendEther from '../SendEther';




const Profile = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [profileData, setProfileData] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { hash } = useLocation();


  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const loadProfileData = async () => {
    const localProfileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    try {
      const response = await axios.get(`http://localhost:3001/api/users/profile/${userProfile.username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProfileData({ ...response.data, ...localProfileData });
    } catch (error) {
      console.error("Error fetching profile data", error);
      setProfileData(localProfileData);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [userProfile.username]);

  useEffect(() => {
    const handleStorageChange = () => {
      loadProfileData();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);

    axios.post(`http://localhost:3001/api/users/upload/${userProfile.username}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(response => {
      console.log("Image upload response:", response.data);
      const updatedProfile = { ...userProfile, profileImage: response.data.filePath };
      
      updateUserProfile(updatedProfile); 
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      loadProfileData();
    }).catch(error => console.error("Error uploading image", error));
  };





  console.log("Current profileData state:", profileData);

  return (
    <div id="profile-section" className="min-h-screen">
     <div className="bg-[#4A092C] shadow-lg">
      <div className="h-64 overflow-hidden">
          <img className="w-full" src="https://mytechdecisions.com/wp-content/uploads/2022/05/AdobeStock_280704447-1000x500.jpeg" alt="" />
        </div>
        <div className="flex justify-center px-5 -mt-12">
        <input type="file" id="profileImageInput" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <label htmlFor="profileImageInput">
            {
              profileData && profileData.profileImage
                ? <ProfileImage imagePath={profileData.profileImage} altText="Profile" className="h-48 w-48 bg-white p-2 rounded-full cursor-pointer" />
                : <FontAwesomeIcon className="h-32 w-32 bg-white p-2 rounded-full defaultProfileImage cursor-pointer" icon={faCircleUser} />
            }
          </label>
        </div>

     
        <div>
          <div className="text-center px-14">
            <h2 className="text-gray-300 text-3xl font-bold mt-2">{profileData?.username || 'User'}</h2>
            <p className="text-gray-400 text-sm">{profileData?.bio || 'Your bio goes here...'}</p>
          </div>

            <div>
              <div className="text-center px-6 pt-8">
                <h3 className="text-gray-300 text-2xl font-bold mb-2">About Me</h3>
              </div>

              <div className="max-w-5xl mx-auto rounded-lg shadow-xl overflow-hidden specialBgColor">
                <div className="p-4">
                  <div className="flex items-center">
                    <h4 className="specialTextColor font-bold">Status:</h4>
                    <p className="ml-2">{profileData?.status}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <h4 className="specialTextColor font-bold">Favorite Things:</h4>
                    <p className="ml-2">{profileData?.favorites}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <h4 className="specialTextColor font-bold">Vision:</h4>
                    <p className="ml-2">{profileData?.vision}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <h4 className="specialTextColor font-bold">Contact:</h4>
                    <p className="ml-2">{profileData?.contact}</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <h4 className="specialTextColor font-bold mb-2">Q&A:</h4>
                  {profileData.faq && profileData.faq.map((qa: any, index: any) => (
                    <div key={index} className="mb-2">
                      <h5 className="specialTextColor font-semibold">{qa.question}</h5>
                      <p>{qa.answer}</p>
                    </div>
                  ))}
                  <button className='my-4 py-2 px-5 rounded-full focus:outline-none focus:shadow-outline buttonProfileUpdate float-right bg-transparent specialTextColor' onClick={() => window.location.href = '/updateProfile'}>UPDATE PROFILE</button>
                </div>
              </div>
            </div>
          <hr className="mt-6" />
        </div>
      </div>
      <div className='mt-6'>
      <SendEther />
      </div>
    </div>
  );
};


export default Profile;


