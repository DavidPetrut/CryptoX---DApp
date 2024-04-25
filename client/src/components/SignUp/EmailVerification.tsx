import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  let [verificationStarted, setVerificationStarted]:any = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!verificationStarted) {
      setVerificationStarted(true);
      const verifyEmail = async () => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        console.log(`Starting email verification for token: ${token}`);
        
        if (token) {
          try {
            console.log("start the await axios.get from frontend")
            await axios.get(`http://localhost:3001/api/users/verify-email?token=${token}`);
            console.log(`Email verification successful. Redirecting to login.`);
            navigate('/login');
          } catch (error) {
            console.log(`Email verification failed:`, error);
          }
        }
      };
      verifyEmail();
      verificationStarted = true;
    }
  }, [location, navigate]); 

 

  return (
    <div>
      Verifying your email...
    </div>
  );
};

export default EmailVerification;
