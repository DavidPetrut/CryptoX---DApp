import { AiOutlineClose } from "react-icons/ai"
import logo from "../../images/logo.png"
import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './SignUp/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ProfileImage from './SignUp/ProfileImage';
import "../navbar.css"
import scrollToId from './HelperComponents/SmoothScroll';


interface NavBarItemProps {
    title: string;
    classProps?: string;
    scrollToId: string; 
}


const NavBarItem = ({ title, classProps, scrollToId: targetId }: NavBarItemProps): JSX.Element => {
    const handleClick = () => {
      scrollToId(targetId); 
    };
    return (
      <li className={`mx-0 cursor-pointer navbarLinks navbarLinksTop ${classProps}`} onClick={handleClick}>
        {title}
      </li>
    );
  };
  

interface UserProfile {
  username?: string;
  email?: string;
  profileImage?: string;
}

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userProfile, logout }= useAuth();
    const [toggleMenu, setToggleMenu] = useState(false);
    let [showDropdown, setShowDropdown] = useState(false);
    let [clickCount, setClickCount] = useState(0);
    const [localUserProfile, setLocalUserProfile] = useState<UserProfile | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { hash } = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    
    useEffect(() => {
      function handleClickOutside(event:any) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setShowDropdown(false);
          }
      }
      if (showDropdown) {
          document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [showDropdown]);


    useEffect(() => {
      if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [hash]);

    const handleLogoClick = (page:string) => {
      clickCount = 1
      setClickCount(prevCount => prevCount + 1);
      if (clickCount === 1) {
        navigate(`/${page}`);
        setShowDropdown(!showDropdown);
      } else {
        setClickCount(1);
      }
    };

    
    useEffect(() => {
        if (!isAuthenticated) {
            setShowDropdown(false);
        } 
    }, [isAuthenticated, navigate]);
    
    const handleLogout  = () => {
        logout(); 
        navigate('/login#login-section');
    };

    useEffect(() => {
      const storedUserProfile = localStorage.getItem('user');
      if (storedUserProfile) {
          setLocalUserProfile(JSON.parse(storedUserProfile));
      }
  }, [userProfile]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);   


    const handleNavigation = (page: string) => {
      navigate(`/${page}`);  
      setToggleMenu(false);  
    };
  
  

    return (
        <nav className={`w-full flex md:justify-center justify-between items-center p-4 fixed top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#2c042c]' : 'bg-gradient-bg-welcome'}`}>
          <div className="md:flex-[0.5] flex-initial justify-center items-center logoStyle">
              <img src={logo} onClick={() => { navigate("/#focus-main") }} alt="logo" className="w-32 cursor-pointer" />
          </div>
          {isAuthenticated ? (
              <div ref={dropdownRef} className="flex items-center profile-container cursor-pointer linksNavbarContainer">
                <ul className={`text-white md:flex hidden list-none flex-row justify-between items-center flex-initial linksNavbar ${!isAuthenticated && 'hidden'}`}>
                    {["Wallets", "Services", "Transactions", "Contact"].map((item, index) => (
                        <NavBarItem key={item + index} title={item} scrollToId={item.toLowerCase()} />
                    ))}
                </ul>
                <div>
                {
                    isAuthenticated && localUserProfile && localUserProfile.profileImage
                        ? <ProfileImage imagePath={userProfile.profileImage} altText="Profile" className="hidden md:flex w-10 h-10 rounded-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
                        : <FontAwesomeIcon className="hidden md:flex w-8 h-8 bg-white p-0 rounded-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} icon={faCircleUser} />
                }
                </div>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-tl-lg rounded-bl-lg shadow-xl dropdown-content text-center specialRightBorder" onClick={(e) => e.stopPropagation()}>
                        <span className="block px-4 py-2 rounded-tl text-white bg-[#282737] hover:bg-[#374151] dropDownWelcomeProfile">
                            {`User Account ${userProfile ? userProfile.username : 'Guest'}`}
                        </span>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("#focus-main")}>Dashboard</a>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>My Profile</a>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Transactions</a>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Display Wallet</a>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Account Details</a>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Connect New Wallet</a>
                        <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Send Ethereum</a>
                         <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Services & Support</a>
                         <a className="block px-4 py-2 text-white bg-[#282737] hover:bg-[#374151] cursor-pointer" onClick={() => handleLogoClick("profile#profile-section")}>Settings</a>
                        <button className="block w-full px-4 py-2 text-white bg-[#F6504F] hover:bg-[#9D2039] cursor-pointer dropDownLogOut" onClick={handleLogout}>Log Out</button>
                    </div>       
                  )}
              </div>
          ) : (
              <>
                  <Link to="/signup" className="py-2 px-7 mr-1 rounded-full rounded-tr rounded-br cursor-pointer loginSingUpButtons loginSingUpButtonsSpecial">Sign Up</Link>
                  <Link to="/login" className="py-2 px-7 rounded-full rounded-tl rounded-bl cursor-pointer loginSingUpButtons">Login</Link>
              </>
          )}

        <div className="flex relative">
            {isAuthenticated && localUserProfile && localUserProfile.profileImage
                ? <ProfileImage imagePath={userProfile.profileImage} altText="Profile" className="w-10 h-10 rounded-full cursor-pointer md:hidden" onClick={() => setToggleMenu(!toggleMenu)} />
                : <FontAwesomeIcon className="w-8 h-8 bg-white p-0 rounded-full cursor-pointer md:hidden" onClick={() => setToggleMenu(!toggleMenu)} icon={faCircleUser} />
            }
            {toggleMenu && (
                <ul className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                    <li className="text-xl w-full my-2">
                        <AiOutlineClose onClick={() => setToggleMenu(false)} className="mobileNav" />
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className="mobileNav navbarLinks" onClick={() => handleNavigation("#focus-main")}>Dashboard</li>
                            <li className="mobileNav navbarLinks" onClick={() => handleNavigation("profile#profile-section")}>My Profile</li>
                            {["Wallets", "Services", "Transactions", "Contact"].map((item, index) => (
                                <NavBarItem key={item + index} title={item} scrollToId={item.toLowerCase()} />
                            ))}
                            <li className="my-2 text-lg mobileNav mobileNavBtn" onClick={handleLogout}>Log Out</li>
                        </>
                    ) : (
                        ["Market", "Exchange", "Tutorials", "Wallets"].map(
                            (item, index) => <NavBarItem key={item + index} title={item} classProps="my-2 text-lg" scrollToId={""} />
                        )
                    )}
                </ul>
            )}
        </div>
      </nav>
    );
  };
    
    export default Navbar;

