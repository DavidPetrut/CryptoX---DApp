import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext'; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertColor, setAlertColor] = useState('text-green-500');
  const { hash } = useLocation();


  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);


  const handleLogin = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertMsg('');

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
      });
      setIsLoading(false);
      
      login(response.data.token, { username: response.data.username, email: response.data.email, profileImage: response.data.profileImage });
      navigate('/#focus-main'); 
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'An error occurred during login.';
        setAlertMsg(errorMessage);
      } else {
        setAlertMsg('An unexpected error occurred.');
      }
      setAlertColor('text-red-500');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="login-section" className="w-full max-w-md p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg formContainer">
        <h1 className='text-white text-2xl mb-4 font-bold text-center'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faEnvelope} className='mr-2'/> Email
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="Email" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
              <FontAwesomeIcon icon={faLock} className='mr-2'/> Password
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   placeholder="**********" required />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" disabled={isLoading}
                    className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full buttonSignUp">
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </div>
          {alertMsg && <div className={`${alertColor} mt-2 text-center`}>{alertMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;




