import React from 'react'
import axios from 'axios'

import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {checkSessionId, enforceHTTPS } from '../App';

const SlideoutMenu = () => {

  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    // forces https connection
    enforceHTTPS()
    // checks if user is logged in. If so, set state
    checkSessionId().then(validUser =>{
        if(validUser){
            setLoggedin(true)
        }
    })
  }, [])

  const Button = (props) => {
    return(
      <>
        <button className="loginButton">{props.title}</button>
      </>
    )
  }

  const SignoutFunction = async () =>{
    setLoggedin(false)
    await axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/signout.php').then((response) => {
      if(response.data === "not connected"){
        console.log("not connected to database")
      }
      else if (response.data === "hello"){
        console.log("all done")
      }
    }, (error) => {
      console.log(error);
    });
  }
  

  return (
    <div className='slideout-menu'>
        <ul>
            <li>
            {!loggedin && <Link to="/login" className="routing-link">Log In</Link>}
            </li>
            <li>
            {!loggedin && <Link to="/signup" className="routing-link">Sign Up</Link>}
            </li>
            <li>
            {loggedin && <Link to="/edit-profile" className="routing-link">Profile</Link>}
            </li>
            <li>
            {loggedin && <Link to="/account-settings" className="routing-link">Account Settings</Link>}
            </li>
            <li>
            {loggedin && <Link to = "/" className='routing-link'><p onClick={SignoutFunction}>Sign Out</p></Link>}
            </li>
        </ul>
    </div>
  )
}

export default SlideoutMenu