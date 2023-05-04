import React, {useState, useEffect} from 'react'
import EventPopup from '../event-popup/event-popup-view'
import Xbutton from '../../images/X-button.png'
import NewFeedArea from './NewFeedArea';
import LikeButton from '../../images/thumbup.png'
import GreenLikeButton from '../../images/thumbup-green.png'
import ShareButton from '../../images/share-button.png'
import CommentButton from '../../images/comment-button.png'
import PostButton from '../createEvent/PostButton';
import axios from 'axios'
import { enforceHTTPS, checkSessionId } from '../../App';
import { BrowserRouter, Route, Link, useNavigate } from 'react-router-dom';
import { isArray, isNull, result } from 'lodash';
import AddComment from '../event-popup/add-comment';



const NewFeedPost = ({post_id, pfp, posterName, title, thumbnail, numBookmarked, eventTag, allowClickEvent, eventID, onButtonClick}) => {
    const navigate = useNavigate()

    const [showEventPopup, setEventPopup] = useState(false)
    const [showCommentPopup, setCommentPopup] = useState(false)
    let postFeedView = "post-feedview"

    let likeThumbsUpImage = LikeButton
    let dislikeThumbsUpImage = LikeButton
    const [likeThumbsUp, setlikeThumbsUp] = useState(true)

    const [currentLikes, setCurrentLikes] = useState(0)
    const [currentDislikes, setCurrentDislikes] = useState(0)
    const [eventCode, setEventCode] = useState("")
    const [feedBack, setFeedback] = useState("")
    const [showCodePrompt, setShowCodePrompt] = useState(false)
    const [deleteButton, setDeleteButton] = useState(true)

    // checks the current likes sets the likes to that number for displaying
    const CheckCurrentLikes = async () =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/current-likes.php", {
            id: eventID}).then((val) =>{
                //console.log("current likes: ")
                //console.log(val.data)
                setCurrentLikes(val.data)
            if(val.data === "not connected"){
                //console.log("not connected to database")
                }
                else if (val.data === "done"){
                //console.log("all done")
                }
            }, (error) => {
                console.log(error);
            });
        //console.log("the current likes: ")
        //console.log(currentDislikes)
    }
    CheckCurrentLikes()

    // checks the current dislikes sets the dislikes to that number for displaying
    const CheckCurrentDislikes = async () =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/current-dislikes.php", {
            id: eventID}).then((val) =>{
                //console.log("current dislikes: ")
                //console.log(val.data)
                setCurrentDislikes(val.data)
            if(val.data === "not connected"){
                //console.log("not connected to database")
                }
                else if (val.data === "done"){
                //console.log("all done")
                }
            }, (error) => {
                console.log(error);
            });
        //console.log("the current dislikes: ")
        //console.log(currentDislikes)
    }
    CheckCurrentDislikes()


    function SwapLikeThumbsup(e){
        setlikeThumbsUp(!likeThumbsUp)

        if (likeThumbsUp){
            e.target.setAttribute('src', GreenLikeButton)
            //likeThumbsUpImage = GreenLikeButton
        }
        else{
            likeThumbsUpImage = LikeButton
        }
    }

    const [dislikeThumbsUp, setdislikeThumbsUp] = useState(true)
    function SwapDislikeThumbsup(e){
        setdislikeThumbsUp(!dislikeThumbsUp)

        if (dislikeThumbsUp){
            e.target.setAttribute('src', GreenLikeButton)
            //likeThumbsUpImage = GreenLikeButton
        }
        else{
            //e.target.setAttribute('src', LikeButton)  this should remove the user specific dislike
        }
    }

    function displayEventPopup(){
        setEventPopup(!showEventPopup)

        if (showEventPopup){
            postFeedView = "post-feedview-opaque"
        }
        else{
            postFeedView = "post-feedview"
        }
    }

    function displayCommentPopup(){
        setCommentPopup(!showCommentPopup)

        if (showCommentPopup){
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

    function displayEventandCommentPopup(){
        displayEventPopup()
        displayCommentPopup()
    }


    const configs = {
        animate:true
    };

    // returns true if the user liked an event, false if otherwise
    const CheckIfUserLikedEvent = async (e) => {
        result = false
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/check-if-user-liked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "liked"){
                //console.log("event is liked")
                result = true
            }
            else if (val.data === "not liked"){
                //console.log("event is not liked")
                result = false
            }
            }, (error) => {
                console.log(error);
            });
        return result
    }

    // increases the like counter for an event by 1
    const LikeEvent = async (e) =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/like-event.php", {
            id: eventID}).then((val) =>{
                //console.log(val.data)
            if(val.data === "not connected"){
                //console.log("not connected to database")
                }
                else if (val.data === "done"){
                //console.log("all done")
                }
            }, (error) => {
                console.log(error);
            });
        CheckCurrentLikes()
        AddUserToLikedEvent()

    }

    // adds user to list of likes for an event
    const AddUserToLikedEvent = async (e) =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/add-user-to-liked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "not connected"){

                }
                else if (val.data === "done"){

                }
            }, (error) => {
                console.log(error);
            });
    }
    

    // reduces the like count for an event by 1
    const RemoveLike = async (e) => {
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/remove-like.php", {
            id: eventID}).then((val) =>{
            if(val.data === "liked"){

            }
            else if (val.data === "not liked"){

            }
            }, (error) => {
                console.log(error);
            });
        CheckCurrentLikes(e)
    }

    // removes user from the list of likes on an event
    const RemoveUserFromLikedEvent = async (e) =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/remove-user-from-liked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "removed"){
                RemoveLike(e)
                //SwapDislikeThumbsup(e)
            }
            else if (val.data === "not liked"){

            }
            }, (error) => {
                console.log(error);
            });

    }

    // this will either remove a user and their like if they already liked, or it will like the event otherwise
    const ClickedLikeAndSignedIn = async (e) =>{
        //console.log("clicked like")
        //console.log("eventID: ")
        //console.log(eventID)
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/check-if-user-liked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "liked"){
                RemoveUserFromLikedEvent(e)
            }
            else if (val.data === "not liked"){
                LikeEvent(e) 
            }
            }, (error) => {
                console.log(error);
            });

        //LikeEvent()
        //SwapLikeThumbsup(e) // use this when you have specific user likes
    }

    // checks if the user is signed in, if they are then the like processes
    const ClickedLike = async (e) =>{
        
        checkSessionId().then(validUser =>{
            if(!validUser){
                navigate("/login")
            }
            else{
                CheckIfUserDislikedEvent(e).then((val) =>{
                    if (val === true){

                    }else{
                        ClickedLikeAndSignedIn(e)
                    }
                })
            }
        })
    }



    // adds a user to the list of likes on an event
    const AddUserToDislikedEvent = async (e) =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/add-user-to-disliked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "not connected"){

                }
                else if (val.data === "done"){

                }
            }, (error) => {
                console.log(error);
            });
    }

    // decreases the count of dislikes on an event by 1
    const RemoveDislike = async (e) => {
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/remove-dislike.php", {
            id: eventID}).then((val) =>{
            if(val.data === "disliked"){

            }
            else if (val.data === "not disliked"){

            }
            }, (error) => {
                console.log(error);
            });
        CheckCurrentDislikes(e)
    }

    // removes a user from the list of dislikes on an event
    const RemoveUserFromDislikedEvent = async (e) =>{
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/remove-user-from-disliked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "removed"){
                RemoveDislike(e)
                //SwapDislikeThumbsup(e)
            }
            else if (val.data === "not disliked"){

            }
            }, (error) => {
                console.log(error);
            });

    }

    // increases count for dislikes on an event by 1
    const DislikeEvent = async (e) => {
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/dislike-event.php", {
            id: eventID}).then((val) =>{

            if(val.data === "not connected"){

                }
                else if (val.data === "done"){

                }
            }, (error) => {
                console.log(error);
            });
        AddUserToDislikedEvent(e)
        CheckCurrentDislikes(e)
        //SwapDislikeThumbsup(e)
    }

    // checks if the user disliked the event, returns true if they did
    const CheckIfUserDislikedEvent = async (e) => {
        result = false
        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/check-if-user-disliked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "disliked"){
                result = true
            }
            else if (val.data === "not disliked"){
                result = false
            }
            }, (error) => {
                console.log(error);
            });
        return result
    }

    // // this will either remove a user and their dislike if they already disliked, or it will dislike the event otherwise
    const ClickedDislikeAndSignedIn = async (e) =>{

        await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/check-if-user-disliked-event.php", {
            id: eventID}).then((val) =>{
            if(val.data === "disliked"){
                RemoveUserFromDislikedEvent(e)
            }
            else if (val.data === "not disliked"){
                DislikeEvent(e) 
            }
            }, (error) => {
                console.log(error);
            });
    }

    // checks if the user is logged in, if they are then the dislike processes
    const ClickedDislike = async (e) =>{

        checkSessionId().then(validUser =>{
            if(!validUser){
                navigate("/login")
            }
            else{
                // if the user liked the event, they cannot dislike it
                CheckIfUserLikedEvent(e).then((val) =>{
                    if (val === true){
                    }else{
                        ClickedDislikeAndSignedIn(e)
                    }
                })
            }
        })
    }

    async function checkEventCode(){
        
        const validUser = await checkSessionId()
        if(!validUser){
            navigate("/login")
            return
        }

        const response = await axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/check-event-code.php",{
          eventID: eventID,
          eventCode: eventCode
        }) 
    
        setFeedback(response.data)
    
      }


      async function DeleteEvent(post_id){
        
        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/deleteEvent.php', post_id)
        // axios.get("http://localhost/load-event.php")
        .then(val => {
            
            if(val.data !== "Nothing"){
                console.log("Nothing at all");
            }

            onButtonClick();
  
        })
      }

    
  return (
    <>
    
        <div className="post-feedview">
                    
            <div className="lpost-feedview">
                <img className ="poster-pfp-feedview" src={pfp} alt = {`${posterName}'s profile pic`}/>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star bookmark-feedview" viewBox="0 0 16 16">
                    <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                </svg> */}
            </div>
            
            <div className = "rpost-feedview">
                <p className="poster-feedview">{posterName}</p>

                <img className ="post-thumbnail" src={thumbnail} alt= {`${posterName}'s thumbnail`} onClick={displayEventPopup}/>

                <p className="title-feedview">{title}</p>
                
                <div className="post-footer-feedview">
                    <p className = "num-bookmarked-feedview">{numBookmarked} people are following this event</p>
                    <p className="tags-feedview">{eventTag}</p>
                </div>
                <button className="btn btn-primary me-5" onClick={() => DeleteEvent(post_id)} >Delete</button>
                

            </div>
            
        </div>
        
        <div className='event-popup-display'>
            {showEventPopup && <img className ="poster-pfp-popup-feedview" src={pfp} alt = {`${posterName}'s profile pic`}/>}
            {showCommentPopup && <img className='event-x-button'src={Xbutton} onClick={displayEventandCommentPopup}></img> ||
            showEventPopup && <img className='event-x-button'src={Xbutton} onClick={displayEventPopup}></img>}
            {showEventPopup && <img className='like-event-button'src={LikeButton} onClick={ClickedLike}></img>}
            {showEventPopup && <img className='dislike-event-button'src={LikeButton} onClick={ClickedDislike}></img>}
            {showEventPopup && <img className='share-event-button'src={ShareButton} onClick={() => setShowCodePrompt(!showCodePrompt)}></img>} 
            {showEventPopup && <img className='comment-event-button'src={CommentButton} onClick= {displayCommentPopup} ></img>}
            
            <div className = 'comment-popup'>
                {showCommentPopup && (<AddComment post_id = {post_id} closeCommentAfterSubmit = {displayCommentPopup}/>)}
            </div>
            {showEventPopup && (<EventPopup post_id = {post_id} pfp={pfp} posterName={posterName} title={title} thumbnail={thumbnail} numBookmarked={numBookmarked} eventTag={eventTag}/>)}
            {showEventPopup && <h1 className='like-counter'>{currentLikes}</h1>}
            {showEventPopup && <h1 className='dislike-counter'>{currentDislikes}</h1>}

            
            {showEventPopup && showCodePrompt && <><div className='event-code-submit'>
            <label htmlFor='event-code-enter' style={{display:'block', color: 'white'}}>Enter event code here for attendance</label>
            <input id = 'event-code-enter' type='text' style={{display:'block'}} onChange={(e) => setEventCode(e.target.value)}/>
            {feedBack && showEventPopup && showCodePrompt && <p style={{color:'white', fontSize:'16px'}}>{feedBack}</p>}
            <button id="cancel-code-submit" style = {{marginRight: '10px'}} onClick={() => setShowCodePrompt(!showCodePrompt)}>Close</button>
            <button id="code-submit-btn" onClick={checkEventCode}>Submit Code</button>
            </div></>}
          
        </div>
        
        {showCommentPopup && <div className='event-popup-background' onClick={displayEventandCommentPopup}></div> ||
        showEventPopup && <div className='event-popup-background' onClick={displayEventPopup}></div> 
        }
        
    </>
  )
}

export default NewFeedPost

