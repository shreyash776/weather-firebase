import {useState}from 'react'

import {app} from "../firebase"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);


const SignIn = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
    const signInUser =(e)=>{
      e.preventDefault();
        signInWithEmailAndPassword(auth,email,password) 
        .then((value)=>{
         
          alert("signin successful");
          window.location.href = '/weather';
      }
        
        )  
        .catch((err)=>{console.log(err);
          alert("Invalid Information")});
      }
  return (
    
     <div className="signup-container">
    <div className="signup-image">
    
      <img src="/undraw_mobile_login_re_9ntv.svg" alt="Signup" />
    </div>
    <div className="signup-form">
      <h1>Signin</h1>
      <div className='form'>
        <label htmlFor="email">Your Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" value={email} required />
    
        <label htmlFor="password">Password</label>
        <input   onChange={(e)=>setPassword(e.target.value)} value={password} type="password" id="password" name="password" required />


        <button onClick={signInUser}>Signin</button>
      </div>
    </div>
  </div>
      
    
  )
}

export default SignIn
