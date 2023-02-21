import React from 'react'
import {Link} from "react-router-dom";
import {auth} from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import MenuItem from "@material-ui/core/MenuItem";
import './navbar.css'
import { colors } from '@material-ui/core';


function Navbar() {

  const [user]=useAuthState(auth);
  const signUserOut=async()=>{
    await signOut(auth);
  }
  return (
    <div>
      <div className='navigation'>
      <div className="click">
      <div className="content">
    <Link to="/" style={{ textDecoration: 'none' ,color:'white',fontSize:'32px'}}>  <MenuItem style={{ paddingLeft: 13,fontSize:22 }}>Home</MenuItem></Link>
    </div>
    <div className="content">
    {!user? (<Link to="/login" style={{ textDecoration: 'none' ,color:'white',fontSize:'32px'}}>  <MenuItem style={{ paddingLeft: 13,fontSize:22 }}>Login</MenuItem></Link>):(
       <Link to="/createpost"style={{ textDecoration: 'none'  ,color:'white',fontSize:'32px'}}><MenuItem style={{ paddingLeft: 13,fontSize:22 }}>Create Post</MenuItem></Link>
    )}
    </div>
   </div>
    <div className='image'>
      {user &&(
        <>
      <div className="content"><p>{user?.displayName}</p></div>
      <div className="content">  <img src={user?.photoURL|| ""} width="100" height="100" className="myimg"/> </div>
      <div className="content">  <button onClick={signUserOut} className="mybutton">Log Out</button> </div>
</>
      )}
    </div>
    </div>
    </div>
  )
}

export default Navbar