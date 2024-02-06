import  {useEffect,useState} from 'react';
import {NavLink} from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import useAuth from '../hooks/useAuth';

import {app} from "../firebase"


const auth =getAuth(app);
const Navbar = ({setMe}) => {
const { user, isAdmin } = useAuth();

    const [userName, setUserName] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserName(user.email);
            setMe(user)
            // console.log("value of user:",user)
            // console.log("name of user:",user.name)

          } else {
            setUserName(null); // Reset userName if user is not logged in
          }
        });
      
        return () => {
          unsubscribe(); // Unsubscribe from the onAuthStateChanged listener when the component unmounts
        };
      }, []);
    const handleLogout = async () => {
      try {
        await signOut(auth);
        // Navigate to the home page after successful logout
        window.location.href = '/signin';
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };
 return (
    <nav className="navbar">
      <div className="navbar-logo">SkyView</div>
      <div className="navbar-links" >
        <a href="/">Home</a>
        <a className='name'>User: {userName}</a>
        <NavLink to="/admintable" style={{ display: isAdmin ? 'block' : 'none' }} ><a >Admin table</a></NavLink>
        <NavLink to="/usertable" style={{ display: user ? 'block' : 'none' }}>
  <a>Active users</a>
</NavLink>

        <NavLink to="/" style={{ display: user ? 'none' : 'block' }} >
          <button>SignUp</button>
        </NavLink>
        <NavLink to="/signin" style={{ display: user ? 'none' : 'block' }}>
          <button>SignIn</button>
        </NavLink>
        <button onClick={handleLogout} style={{ display: user ? 'block' : 'none' }}>
  Logout
</button>
      </div>
     
    </nav>
  );
};

export default Navbar;
