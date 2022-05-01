import React from 'react'
import { useContext } from 'react'
import { AuthContext } from "../context/auth";
import ProfileComp from './ProfileComp'
import { useNavigate } from "react-router-dom";

function Profile(){
    const {user} = useContext(AuthContext)
    const Redirect = ()=>{
      const router = useNavigate();
      router('/login');
      return null;
    }
    console.log("I am speaking from profile");
    return(
        <>
        {
           user?.uid ? <ProfileComp /> : <Redirect />
        }
            
        </>
    )
}

export default Profile;