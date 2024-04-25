import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: any;
  login: (token: string, profile: any) => void;
  logout: () => void;
  updateUserProfile: (profile: any) => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userProfile: null,
    login: () => {},
    logout: () => {},
    updateUserProfile: () => {},
  });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const updateUserProfile = (updatedProfile: any) => {
    localStorage.setItem('user', JSON.stringify(updatedProfile)); 
    setUserProfile(updatedProfile); 
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserProfile(JSON.parse(storedUser));
      }
    }
  }, []);



  const login = (token: string, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true); 
    setUserProfile(user);
    window.location.reload();
  };


const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setIsAuthenticated(false); 
  setUserProfile(null);
  window.location.reload();

};

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};


