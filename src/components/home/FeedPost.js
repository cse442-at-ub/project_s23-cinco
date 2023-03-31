import React, {useState} from 'react'
import EventPopup from '../event-popup/event-popup-view'
import Overlay from "react-overlay-component";
import Xbutton from '../../images/X-button.png'
import FeedArea from './FeedArea';


const FeedPost = ({pfp, posterName, title, thumbnail, numBookmarked, eventTag, allowClickEvent}) => {
    
    const [showEventPopup, setEventPopup] = useState(false)
    let postFeedView = "post-feedview"

    function displayEventPopup(){
        setEventPopup(!showEventPopup)

        if (showEventPopup){
            postFeedView = "post-feedview-opaque"
        }
        else{
            postFeedView = "post-feedview"
        }
    }

    function checkAllowClickableEvent(){
        if (allowClickEvent.allowClickEvent) {
            displayEventPopup()
        }
    }



    const configs = {
        animate:true
    };
    
  return (
    <>
    
        <div className="post-feedview">
                    
            <div className="lpost-feedview">
                <img className ="poster-pfp-feedview" src={pfp} alt = {`${posterName}'s profile pic`}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star bookmark-feedview" viewBox="0 0 16 16">
                    <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
            </div>
            
            <div className = "rpost-feedview">
                <p className="poster-feedview">{posterName}</p>

                <img className ="post-thumbnail" src={thumbnail} alt= {`${posterName}'s thumbnail`} onClick={displayEventPopup}/>

                <p className="title-feedview">{title}</p>
                
                <div className="post-footer-feedview">
                    <p className = "num-bookmarked-feedview">{numBookmarked} people are following this event</p>
                    <p className="tags-feedview">{eventTag}</p>
                </div>
            </div>
            
        </div>

        <div className='event-popup-display'>
            {showEventPopup && <img className ="poster-pfp-popup-feedview" src={pfp} alt = {`${posterName}'s profile pic`}/>}
            {showEventPopup && <img className='event-x-button'src={Xbutton} onClick={displayEventPopup}></img>}
            {showEventPopup && (<EventPopup pfp={pfp} posterName={posterName} title={title} thumbnail={thumbnail} numBookmarked={numBookmarked} eventTag={eventTag}/>)}
        </div>
       
        
    </>
  )
}

export default FeedPost
