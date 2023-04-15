import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';



const Navbar = ({displaySlideoutMenu}) => {
  return (
    <div className="navigator">
        <div style = {{display: "flex", alignItems: "center"}}>
            <div className='hamburger-icon' onClick={displaySlideoutMenu}>
                <div className = "hamburger"></div>
                <div className = "hamburger"></div>
                <div className = "hamburger"></div>
            </div>
            <p className='nav-logo'>Company</p>
            <p className='nav-links'>Search</p>
            <p className='nav-links'>Notifications</p>
            <Link to="/edit-profile" className="routing-link" ><p className='nav-links'>Profile</p></Link>
            <Link to="/account-settings" className="routing-link" ><p className='nav-links'>Account Settings</p></Link>
            <Link to="/login" className="routing-link" ><p className='nav-links'>Login</p></Link>
            <Link to="/event-manager" className="routing-link" ><p className='nav-links'>Manage Events</p></Link>
        </div>
        <div className="nav-logsign-btns">
            <button type="button" className="btn btn-secondary">Sign up</button>
        </div>
    </div>
  )
}

export default Navbar