import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useValidation } from './Validation';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const SignUp: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [alertColor, setAlertColor] = useState<string>('text-green-500');

 const { errors, validateForm } = useValidation();
 const navigate = useNavigate(); 

 const handleSignUp = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);

   const isValid = validateForm(username, email, password, repeatPassword);
   if (!isValid) {
     setIsLoading(false); 
     setAlertMsg("Please correct the errors before submitting.");
     setAlertColor('text-red-500');
     return;
   }

   const recaptchaResponse = window.grecaptcha.getResponse();
   console.log("reCAPTCHA response token:", recaptchaResponse);

   try {
     const response = await axios.post('http://localhost:3001/api/users/register', {
       username,
       email,
       password,
       recaptchaResponse 
     });
     navigate('/signupcheck')
   } catch (error: any) {
     setAlertMsg(error.response?.data.message || 'An error occurred during sign up.');
     setAlertColor('text-red-500');
   } finally {
     setIsLoading(false);
     window.grecaptcha.reset();
   }
 };


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <div className="flex justify-center items-center h-screen signUpContainer">
      <div className="w-full max-w-md p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg formContainer">
        <h1 className='text-white text-2xl mb-4 font-bold text-center'>Sign Up</h1>
        <form onSubmit={handleSignUp} className="formSignUpInputs">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            <FontAwesomeIcon icon={faUser} className='mr-2'/> Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            {errors.usernameError && <p className="text-red-500 text-xs italic">{errors.usernameError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} className='mr-2'/> Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
             {errors.emailError && <p className="text-red-500 text-xs italic">{errors.emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            <FontAwesomeIcon icon={faLock} className='mr-2'/> Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
             {errors.passwordError && <p className="text-red-500 text-xs italic">{errors.passwordError}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="repeatPassword">
            <FontAwesomeIcon icon={faLock} className='mr-2' /> Repeat Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Repeat your password"
              required
            />
             {errors.repeatPasswordError && <p className="text-red-500 text-xs italic">{errors.repeatPasswordError}</p>}
          </div>
          <div className='mb-4'>
            <div id="recaptcha-container" className="g-recaptcha" data-theme="dark" data-sitekey="6Le4rnYpAAAAAGxhISIePZGPazevXZNTl6NaM1tE"></div>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full buttonSignUp"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Create New Account'}
            </button>
          </div>
          {alertMsg && <div className={`${alertColor} text-center py-2`}>{alertMsg}</div>}
        </form>
      </div>
    </div>
  );
  
};

export default SignUp;
