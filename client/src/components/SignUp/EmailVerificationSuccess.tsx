import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmailVerificationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 5000); 
  }, [navigate]);

  return (
    <div>
      <h1>Email Verified Successfully!</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
}

export default EmailVerificationSuccess;
