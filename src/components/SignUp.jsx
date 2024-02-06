import React,{useState} from 'react'
import {app} from "../firebase"
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);
const database = getDatabase(app);
 function SignUp(){
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const signupUser =(e)=>{
    console.log("function is working")
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      const user = userCredential.user;
          const userRef = ref(database, `users/${user.uid}`);
          update(userRef, {
            lastLogin: new Date().toISOString(),
            name: name, // Store the user's name
            email:email,
          });
      
      alert("Success");
    navigate('/weather');
  })
    .catch((error)=>{
      console.error('Error during signup:', error);
  alert("Invalid Information")
});
    console.log({email})  ;
  }
  return (
    <div className="signup-container">
    <div className="signup-image">
    
      <img src="/undraw_mobile_login_re_9ntv.svg" alt="Signup" />
    </div>
    <div className="signup-form">
      <h1>Sign up</h1>
      <div className='form'>
      <label htmlFor="name">Your Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" value={name} required />
        <label htmlFor="email">Your Email</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" value={email} required />
    
        <label htmlFor="password">Password</label>
        <input   onChange={(e)=>setPassword(e.target.value)} value={password} type="password" id="password" name="password" required />


        <button onClick={signupUser} >Signup</button>
      </div>
    </div>
  </div>
);
  
}

export default SignUp;