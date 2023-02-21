import React from 'react'
import {auth,provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth';
import "./login.css"
// import { useNavigate } from "react-router-dom";
function login() {
    // const navigate=useNavigate();
    const signInWithGoogle=async ()=>{
        const result=await signInWithPopup(auth,provider);
        // navigate("/");
    }
  return (
    <div className='mylogin' ><h2>Sign with Google to continue</h2>
    <button className="mybutton1" onClick={signInWithGoogle}  >Sign with Google</button>
    </div>
  ) 
}

export default login