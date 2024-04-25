import React, { useState } from 'react';
import emailjs from 'emailjs-com';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); 


    const EMAIL_ID:any = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const EMAIL_SERVICE:any = import.meta.env.VITE_EMAILJS_SERVICE_ID    
    const EMAIL_TEMPLATE:any = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    console.log(EMAIL_ID, EMAIL_SERVICE, EMAIL_TEMPLATE)

    emailjs.init(EMAIL_ID);

    emailjs.sendForm(EMAIL_SERVICE, EMAIL_TEMPLATE, e.currentTarget, EMAIL_ID)
        .then((result) => {
            console.log(result.text); 
            alert('Message sent successfully!'); 
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
              });
        }, (error) => {
            console.log(error.text);
            alert('Failed to send the message, please try again.'); 
        }).finally(() => setIsLoading(false));
        
};



  return (
    <div id='contact' className='specialPadding2'>
    <div className='mb-3'>
      <h3 className="text-white text-3xl text-center my-2">
        Feel Free to Contact Us!
      </h3>
      <hr className='flex justify-center items-center specialHorizontalLinePage' />
      <div className="flex justify-center items-center px-4 sm:px-6">
        <div className="w-full max-w-2xl p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg formContainer mb-24 sm:w-full sm:p-4">
          <h2 className='text-white text-3xl mb-6 font-bold text-center'>Get In Touch</h2>
            <form onSubmit={sendEmail} className="space-y-6">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0 my-3">
                  <input
                    className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 my-3">
                  <input
                    className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0 my-3">
                  <input
                    className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 my-3">
                  <input
                    className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                    type="tel"
                    placeholder="Phone No."
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-2 my-3">
                  <textarea
                    className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                    rows={6}
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className='contactHorizontalLine'></div>
              <div className="flex justify-center w-full">
                <button
                  className="text-white font-bold py-3 px-10 rounded focus:outline-none focus:shadow-outline loginSingUpButtons buttonContact"
                  type="submit"
                  disabled={isLoading} 
                >
                  {isLoading ? (
                    <div className="spinner-border animate-bounce inline-block w-8 h-8 border-4 rounded-full" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    'SUBMIT'
                  )}
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
  );
};

export default ContactForm;
