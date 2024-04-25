import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const ProfileDescription = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [styleForMobile, setStyleForMobile] = useState({});


  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);


  const initialProfileData = JSON.parse(localStorage.getItem('profileData') || '{}');
  if (!initialProfileData.faq) {
    initialProfileData.faq = [];
  }
  const [profileData, setProfileData] = useState(initialProfileData);

  const predefinedQuestions = [
    "What's your favorite hobby?",
    "What's the last book you read?",
    "What's a fun fact about you?",
    "What's your dream vacation destination?",
    "If you could have any superpower, what would it be?",
    "What's your favorite movie of all time?",
    "What's your favorite way to relax?",
    "If you could learn any skill, what would it be?",
    "What's your favorite thing to do on weekends?",
    "What's the best meal you've ever had?",
    "What's one goal you have for this year?",
    "If you could meet anyone, alive or dead, who would it be?",
    "What's your favorite memory from childhood?",
    "What's something you're proud of?",
    "If you could live anywhere, where would it be?"
  ];

  const handleChange = (e:any, field:any) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleFAQChange = (index:any, e:any) => {
    const newFAQs = profileData.faq.map((faq:any, i:any) => {
      if (i === index) {
        return { ...faq, answer: e.target.value };
      }
      return faq;
    });
    setProfileData({ ...profileData, faq: newFAQs });
  };

  const addFAQField = (e:any) => {
    e.preventDefault()
    setProfileData({
      ...profileData,
      faq: [...profileData.faq, { question: predefinedQuestions[0], answer: "" }]
    });
  };

  const handleQuestionChange = (index:any, e:any) => {
    const newFAQs = profileData.faq.map((faq:any, i:any) => {
      if (i === index) {
        return { ...faq, question: e.target.value };
      }
      return faq;
    });
    setProfileData({ ...profileData, faq: newFAQs });
  };

  const deleteFAQ = (index:any) => {
    const updatedFAQs = profileData.faq.filter((_:any, i:any) => i !== index);
    setProfileData({ ...profileData, faq: updatedFAQs });
  };



  const handleSave = (e:any) => {
    e.preventDefault()
    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('Profile updated successfully!');
    navigate("/profile#profile-section")
  };

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  


  useEffect(() => {
    function updateStyleBasedOnWidth() {
      if (window.innerWidth <= 640) {  
        setStyleForMobile({
          margin: '5px',
          width: 'calc(100% - 0px)', 
          maxWidth: 'none',  
        });
      } else {
        setStyleForMobile({});
      }
    }

    updateStyleBasedOnWidth();
    window.addEventListener('resize', updateStyleBasedOnWidth);

    return () => {
      window.removeEventListener('resize', updateStyleBasedOnWidth);
    };
  }, []);


  return (
    <div id='updateProfile'>
      <div className='mb-3 profileDescriptionContainer'>
        <div className="flex justify-center items-center h-screen signUpContainer specialPadding3">
          <div className="w-full max-w-3xl p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg formContainer overflow-y-auto max-h-[150vh] profileDescriptionContainer"
               style={{ paddingRight: '1rem', paddingLeft: '1rem',...styleForMobile }}>
            <h3 className="text-white text-3xl text-center my-5">
              Update Your Profile
            </h3>
            <form className="space-y-6 mb-2 mr-3 ms-3">
              <div className="flex flex-wrap -mx-2">
                 <div className="w-full px-2 my-3">
                  <label className="block">
                    <span className="text-sm text-white font-bold">Bio:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                      placeholder="Your current bio"
                      value={profileData.bio || ''}
                      onChange={(e) => handleChange(e, 'bio')}
                    />
                  </label>
                </div>
                <div className="w-full px-2 my-3">
                  <label className="block">
                    <span className="text-sm text-white font-bold">Status:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                      placeholder="Your current status"
                      value={profileData.status || ''}
                      onChange={(e) => handleChange(e, 'status')}
                    />
                  </label>
                </div>
                <div className="w-full px-2 my-3">
                  <label className="block">
                    <span className="text-sm text-white font-bold">Favorite Things:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                      placeholder="Things you love"
                      value={profileData.favorites || ''}
                      onChange={(e) => handleChange(e, 'favorites')}
                    />
                  </label>
                </div>
                <div className="w-full px-2 my-3">
                  <label className="block">
                    <span className="text-sm text-white font-bold">Vision:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                      placeholder="Your vision or goal"
                      value={profileData.vision || ''}
                      onChange={(e) => handleChange(e, 'vision')}
                    />
                  </label>
                </div>
                <div className="w-full px-2 my-3 mb-10">
                  <label className="block">
                    <span className="text-sm text-white font-bold">Contact:</span>
                    <input
                      type="text"
                      className="mt-1 block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                      placeholder="How to reach you"
                      value={profileData.contact || ''}
                      onChange={(e) => handleChange(e, 'contact')}
                    />
                  </label>
                </div>
                <div className='w-full'>
                <h3 className="flex justify-center text-white text-3xl pb-10">
                  FAQs
                </h3>
                </div>
                  {profileData.faq.map((faq:any, index:any) => (
                    <div key={index} className="w-full px-2 mb-5">
                      <div className="flex justify-between items-center">
                        <select
                          className="block appearance-none w-full bg-gray-700 text-gray-300 border border-gray-600 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500 mb-2"
                          value={faq.question}
                          onChange={(e) => handleQuestionChange(index, e)}
                        >
                          {predefinedQuestions.map((question, qIndex) => (
                            <option key={qIndex} value={question}>
                              {question}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => deleteFAQ(index)}
                          className="ml-4 py-2 px-4 inline-flex justify-center shadow-sm text-sm font-medium rounded focus:outline-none focus:shadow-outline loginSingUpButtons buttonContact mb-2"
                        >
                          Delete
                        </button>
                      </div>
                      <textarea
                        className="mt-1 block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                        rows={3}
                        placeholder="Your Answer"
                        value={faq.answer}
                        onChange={(e) => handleFAQChange(index, e)}
                      ></textarea>
                      <hr className='mt-4'/>
                    </div>
                  ))}
                <div className="flex justify-between w-full px-2">
                  <button
                    className="mt-4 py-3 px-10 rounded focus:outline-none focus:shadow-outline loginSingUpButtons buttonContact"
                    onClick={addFAQField}
                  >
                    Add FAQ
                  </button>
                  <button
                    className="mt-4 py-3 px-10 rounded focus:outline-none focus:shadow-outline loginSingUpButtons buttonContact"
                    onClick={handleSave}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileDescription;
