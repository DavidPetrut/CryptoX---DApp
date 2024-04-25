
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation  } from 'react-router-dom';
import { Navbar, Title, Welcome, Footer, Services, Transactions, Login, SignUp } from "./components";
import ContactForm from "./components/Contact"
import SignUpCheck from './../src/components/SignUp/SignUpCheck';
import EmailVerification from './../src/components/SignUp/EmailVerification';
import EmailVerificationSuccess from './../src/components/SignUp/EmailVerificationSuccess';
import { AuthProvider } from '../src/components/SignUp/AuthContext'
import Profile from '../src/components/SignUp/Profile'
import CheckTransaction from './components/CheckTransaction';
import ProfileDescription from './components/SignUp/ProfileDescription';
import SendEther from './components/SendEther';


const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  return null;
};


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);



  return (
    <AuthProvider> 
    <Router>
      <ScrollToHash />
      <div className='min-h-screen gradient-bg-welcome specialPadding'>
        <Navbar />
        <Routes>
          <Route path="/" element={ isAuthenticated ? (
            <>
              <div className='gradient-bg-welcome'>
                <Title />
                <Welcome />
              </div>
              <Services />
              <Transactions />
            </>
          ) : <Navigate to="/login" />} />
           <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/#focus-main" />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signupcheck" element={<SignUpCheck />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/email-verification-success" element={<EmailVerificationSuccess />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/check-transaction" element={<CheckTransaction />} />
          <Route path="/updateProfile" element={<ProfileDescription /> } />
          <Route path="/send-ether" element={<SendEther />} />
        </Routes>
        <ContactForm />
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;



