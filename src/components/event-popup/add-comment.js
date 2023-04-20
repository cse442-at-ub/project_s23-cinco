import React from 'react'
import { useState, useEffect } from 'react'

import { BrowserRouter, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { enforceHTTPS, checkSessionId } from '../../App';


const AddComment = ({post_id}) => {

    
    const [comment, setComment] = useState("")
    const [commentDate, setCommentDate] = useState(new Date())
    const [submittable, setSubmittable] = useState(true)
    
    const navigate = useNavigate()
    useEffect(() => {
        // forces https connection
        enforceHTTPS()
        // checks if user is logged in. if not, make them log in
        checkSessionId().then(validUser =>{
            if(!validUser){
                navigate("/login")
            }
        })
    }, [])


    async function onSubmit(e){
        e.preventDefault()

        //Check input for users
        //might have to use google api to validate address
        //might have to check date so it's not before current
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

        console.log(response.data)

        /*
        // used for testing
        console.log(eventTitle)
        console.log(eventDateTime.getTime())
        console.log(eventLocation)
        console.log(eventType)
        console.log(eventDescription)
        console.log(eventThumbnail)
        console.log(eventImages)
        */
    }


    return (
        <form id='add-comment' onSubmit={onSubmit}>

            <div className='add-comment-section'>
                <label hmtlFor="add-comment-field">Add your comment</label>
                <input id="add-comment-field" type="text" onChange = {(e) => setComment(e.target.value)}/>
            </div>
            

            <Link to="/"><button type= "button" className='cancel-create-event'>Cancel</button></Link>
            <button type = "submit" className='create-event-submit' form = "create-event">Post</button>

            {!submittable && <p id="add-comment-error">Please enter a comment</p>}
        </form>
  )
}

export default AddComment
