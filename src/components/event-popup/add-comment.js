import React from 'react'
import { useState, useEffect } from 'react'

import { BrowserRouter, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { enforceHTTPS, checkSessionId } from '../../App';
import FeedPost from '../home/FeedPost';


const AddComment = ({post_id, closeCommentAfterSubmit}) => {

    
    const [comment, setComment] = useState("")
    const [commentDate, setCommentDate] = useState(new Date())
    const [submittable, setSubmittable] = useState(true)
    const [canPost, setCanPost] = useState(true)
    
    const navigate = useNavigate()
    // useEffect(() => {
    //     // forces https connection
    //     enforceHTTPS()
    //     // checks if user is logged in. if not, make them log in
    //     checkSessionId().then(validUser =>{
    //         if(!validUser){
    //             navigate("/login")
    //         }
    //     })
    // }, [])
    
    

    async function onSubmit(e){
        e.preventDefault()

        
        if(comment === ""){
            setSubmittable(false)
            return
        }
        
        //got past all the checks so
        setSubmittable(true)
        const fd = new FormData()
        fd.append('post_id', post_id)
        // fd.append('user_id', user_id)
        // fd.append('username', username)
        fd.append('comment', comment)
        fd.append('date', commentDate.getTime())
        
        const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/add-comment.php', fd)
        
        // make user log in again for having expired session. skill issue, bad luck :)
        if(response.data === "invalid session"){
            navigate("/login")
            return
        }

        closeCommentAfterSubmit()
 
    }

    useEffect(() => {
        // forces https connection
       
        // checks if user is logged in. if not, make them log in
        if (comment === "") {
            setCanPost(false)
            
        }
        else {
            setCanPost(true)
            console.log(comment)
        }
    }, [comment])
    

    return (
        // <div className='comment-div'>
        <form id='add-comment' style = {{width: "100px"}}  onSubmit={onSubmit}>
        
            <div className='add-comment-field' style = {{width: "20px"}}>
                {/* <label className="add-comment-field">Add your comment</label> */}
                <textarea type="text" placeholder = "Please enter your comment here..." style = {{width: "420px", height: "60px"}} rows="4" cols="50"onChange = {(e) => setComment(e.target.value)}/>
                {canPost && <button type = "submit" style = {{width: "100px", height: "45px"}} className='comment-submit-button' >Post</button>}
                {!canPost && <button type = "submit" style = {{width: "100px", height: "45px"}} className='button-disable' disabled >Post</button>}
                
                
            </div>
            
            
        
        </form>
    
  )
}

export default AddComment
