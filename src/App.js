import Navbar from './components/Navbar';
import FeedArea from './components/home/FeedArea';
import SlideoutMenu from './components/SlideoutMenu';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SignUpPage from './components/signup-login-pages/signup.js';
import Profile from './components/Profile/Profile.js';
import React, {useState} from 'react'
import CreateEvent from './components/createEvent/CreateEvent';
import PostButton from './components/createEvent/PostButton';

import LoginPage from './components/signup-login-pages/login';
import EditProfilePage from './components/Profile/EditProfilePage';
import AccountSettingsPage from './components/Profile/AccountSettingsPage';

import axios from 'axios';
import EventPopup from './components/event-popup/event-popup-view';



function App() {
  const [showSlideout, setShowSlideout] = useState(false)
  const [sessionId, setSessionId] = useState("")
  
  function displaySlideoutMenu(){
    setShowSlideout(!showSlideout)
  }

  return (
    <>

      <Routes>
        <Route path ='/' element={
            <div className="App">
              <Navbar displaySlideoutMenu={displaySlideoutMenu}/>
              {showSlideout && <SlideoutMenu />}
              <FeedArea />
            </div>
        }>
        </Route>
        <Route path="create-event" element={<CreateEvent/>}></Route>
        <Route path="/edit-profile" element={<EditProfilePage />}></Route>
        <Route path="/account-settings" element={<AccountSettingsPage />}></Route>
        <Route path="/login" element={<LoginPage setSessionId = {setSessionId}/>}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>

      
    </>
  );
}

export default App;


export function enforceHTTPS(){
  if(window.location.href.startsWith("http:")){
    window.location.href = window.location.href.replace("http", "https");
  }
}

//boolean function that returns true if user has valid session
export async function checkSessionId(){
  const response = await axios.get("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/verify-session.php")
  
  //no session cookie. make user sign in (again) to go to page
  //protected routes won't work since you should always check if session is expired or not 
  if(response.data === "invalid"){
    return false
  }
  
  return true
}