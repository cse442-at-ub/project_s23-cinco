import Navbar from './components/Navbar';
import FeedArea from './components/home/FeedArea';
import SlideoutMenu from './components/SlideoutMenu';

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SignUpPage from './components/signup-login-pages/signup.js';
import React, {useState} from 'react'
import CreateEvent from './components/createEvent/CreateEvent';
import PostButton from './components/createEvent/PostButton';

import LoginPage from './components/signup-login-pages/login';
import EditProfilePage from './components/Profile/EditProfilePage';
import AccountSettingsPage from './components/Profile/AccountSettingsPage';
import Tokens from './components/Tokens'
import Tokensview from './components/Tokensview';
import NewFeedArea from './components/EditDelete/NewFeedArea'
import BadgeLeaderboard from './components/BadgeLeaderboard'
import MobileBadgeLeaderboard from './components/MobileBadgeLeaderboard'
import VolunteerLeaderboard from './components/Leaderboard-layout/VolunteerLeaderboard'
import EntertainmentLeaderboard from './components/Leaderboard-layout/EntertainmentLeaderboard'
import FoodLeaderboard from './components/Leaderboard-layout/FoodLeaderboard'
import AdultLeaderboard from './components/Leaderboard-layout/AdultLeaderboard'
import MobileAdultLeaderboard from './components/Leaderboard-layout/MobileAdultLeaderboard'
import MobileFoodLeaderboard from './components/Leaderboard-layout/MobileFoodLeaderboard'
import MobileVolunteerLeaderboard from './components/Leaderboard-layout/MobileVolunteerLeaderboard'
import MobileEntertainmentLeaderboard from './components/Leaderboard-layout/MobileEntertainmentLeaderboard'



import SearchEvent from './components/searchEvent/SearchEvent';

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
              <FeedArea showFilterButton={true} query={""}/>
              <PostButton/>
            </div>
        }>
        </Route>
        <Route path="create-event" element={<CreateEvent/>}></Route>
        <Route path="/search-event" element={<SearchEvent/>}></Route>
        <Route path="/edit-profile" element={<EditProfilePage />}></Route>
        <Route path="/account-settings" element={<AccountSettingsPage />}></Route>
        <Route path="/login" element={<LoginPage setSessionId = {setSessionId}/>}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/leaderboard" element={<BadgeLeaderboard/>}></Route>
        <Route path='/mobile-leaderboard' element={<MobileBadgeLeaderboard/>}></Route>
        <Route path='/volunteer-leaderboard' element={<VolunteerLeaderboard/>}></Route>
        <Route path='/entertainment-leaderboard' element={<EntertainmentLeaderboard/>}></Route>
        <Route path='/food-leaderboard' element={<FoodLeaderboard/>}></Route>
        <Route path='/adult-leaderboard' element={<AdultLeaderboard/>}></Route>
        <Route path='/mobile-adult-leaderboard' element={<MobileAdultLeaderboard/>}></Route>
        <Route path='/mobile-volunteer-leaderboard' element={<MobileVolunteerLeaderboard/>}></Route>
        <Route path='/mobile-food-leaderboard' element={<MobileFoodLeaderboard/>}></Route>
        <Route path='/mobile-entertainment-leaderboard' element={<MobileEntertainmentLeaderboard/>}></Route>
        <Route path="/event-manager" element={
            <div className="NewApp">
              <Navbar displaySlideoutMenu={displaySlideoutMenu}/>
              {showSlideout && <SlideoutMenu />}
              <NewFeedArea showFilterButton={true} query={""}/>
              <PostButton/>
            </div>
          }>
            
          </Route>
        <Route path="/tokens" element={<Tokensview/>}></Route>
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