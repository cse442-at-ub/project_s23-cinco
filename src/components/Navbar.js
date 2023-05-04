import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios'
import { checkSessionId } from '../App';
import { enforceHTTPS } from '../App';

function Navbar ({displaySlideoutMenu}) {
  
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
    <div className="navigator">
        <div style = {{display: "flex", alignItems: "center"}}>
            <div className='hamburger-icon' onClick={displaySlideoutMenu}>
                <div className = "hamburger"></div>
                <div className = "hamburger"></div>
                <div className = "hamburger"></div>
            </div>
            <Link to ="/" className='routing-link'><p className='nav-logo'>Company</p></Link>
            <Link to = "/search-event" className="routing-link"><p className='nav-links'>Search</p></Link> 
            <Link to="/leaderboard" className="routing-link" ><p className='nav-links'>Leaderboard</p></Link>
            {loggedin && <Link to="/edit-profile" className="routing-link" ><p className='nav-links'>Profile</p></Link>}
            {loggedin && <Link to="/account-settings" className="routing-link" ><p className='nav-links'>Account Settings</p></Link>}
            {loggedin && <Link to ="/event-manager" className = "routing-link"><p className='nav-links'>Manage Events</p></Link>}
            {!loggedin && <Link to="/login" className="routing-link" ><p className='nav-links'>Login</p></Link>}
            {!loggedin && <Link to="/signup" className="routing-link" ><p className='nav-links'>Sign Up</p></Link>}
            {loggedin && <Link to = "/" classname="routing-link"><p className='nav-links' onClick={SignoutFunction}>Sign Out</p></Link>}
            {loggedin && <Link to="/tokens" className="routing-link" ><p className='nav-links'>Badges</p></Link>}

        </div>
    </div>
  )
}

export default Navbar