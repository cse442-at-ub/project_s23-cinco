import React from 'react'
import { useState, useEffect } from 'react'
import PreviewImages from './PreviewImages'
import { BrowserRouter, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { enforceHTTPS, checkSessionId } from '../../App';

//if you want to remove react-date-picker pkg, go to sprint2-staticCreateEvent branch
//and look for first pull from dev. that's where you'll get the package-lock and package.json prior to this
import DateTimePicker from 'react-datetime-picker' //https://github.com/wojtekmaj/react-date-picker

const CreateEvent = () => {

    const [eventTitle, setEventTitle] = useState("")
    const [eventDateTime, changeEventDateTime] = useState(new Date())
    const [eventLocation, setEventLocation] = useState("")
    const [eventCode, setEventCode] = useState("")
    const [eventType, setEventType] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventThumbnailPrev, setEventThumbnailPrev] = useState("")
    const [eventImagesPrev, setEventImagesPrev] = useState([])
    const [eventThumbnail, setEventThumbnail] = useState("")
    const [eventImages, setEventImages] = useState("")
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

    function uploadImages(e){
        const imageList = e.target.files
        const imagesPrev = []
        const images = []
        for(let i = 0; i < imageList.length; i++){
            imagesPrev.push(URL.createObjectURL(imageList[i]))
            images.push(imageList[i])
        }

        setEventImages(images)
        setEventImagesPrev(imagesPrev)
    }

    function uploadThumbnail(e){
        if(e.target.files.length !== 0){
            const image = URL.createObjectURL(e.target.files[0])
            setEventThumbnailPrev(image)
            setEventThumbnail(e.target.files[0]) //gives a standard file object
        }
        else{
            //get rid of preview and fail submit since user didn't properly select
            setEventThumbnailPrev("") 
            setEventThumbnail("")
        }
    }

    async function onSubmit(e){
        e.preventDefault()

        //Check input for users
        //might have to use google api to validate address
        //might have to check date so it's not before current
        if(eventTitle === "" || eventLocation === "" || eventType === "" || eventType === "Select Type" || 
        eventThumbnailPrev === "" || eventImagesPrev.length === 0 || eventDescription ==="" || eventCode ===""){
            setSubmittable(false)
            return
        }
        
        //got past all the checks so
        setSubmittable(true)
        const fd = new FormData()
        fd.append('title', eventTitle)
        fd.append('dateTime', eventDateTime.getTime())
        fd.append('location', eventLocation)
        fd.append('eventCode', eventCode)
        fd.append('type', eventType)
        fd.append('description', eventDescription)
        fd.append('thumbnail', eventThumbnail)
        for(let i = 0; i < eventImages.length; i++){
            fd.append('images[]', eventImages[i])
        }
        const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/create-event.php', fd)
        
        // make user log in again for having expired session. skill issue, bad luck :)
        if(response.data === "invalid session"){
            navigate("/login")
            return
        }

        navigate("/")
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
        <form id='create-event' onSubmit={onSubmit}>

            <div className='create-event-section'>
                <label hmtlFor="create-title">Event Title</label>
                <input id="create-title" type="text" onChange = {(e) => setEventTitle(e.target.value)}/>
            </div>
            
            <div className='create-event-section'>
                <label hmtlFor="create-date">When?</label>
                <div id="create-date">
                    <DateTimePicker onChange={changeEventDateTime} value={eventDateTime} />
                </div>
            </div>

            <div className='create-event-section'>
                <label hmtlFor="create-location">Where?</label>
                <input id="create-location" type="text" onChange = {(e) => setEventLocation(e.target.value)}/>
            </div>

            <div className='create-event-section'>
                <label hmtlFor="create-event-code">Secret Event Code</label>
                <input id="create-event-code" type="text" onChange = {(e) => setEventCode(e.target.value)}/>
            </div>

            <div className='create-event-section'>
                <label htmlFor= 'create-tag'>What type of Event is this?</label>
                <select id="create-tag" onChange={(e) => setEventType(e.target.value)}>
                    <option>Select Type</option> {/*Helps user trigger onChange event*/}
                    <option>Recreation</option>
                    <option>Volunteer</option>
                    <option>Entertainment</option>
                    <option>Food</option>
                    <option>Adult</option>
                </select>
            </div>

            <div className='create-event-section'>
                <label hmtlFor="create-description">Event Description</label>
                <textarea id="create-description" onChange = {(e) => setEventDescription(e.target.value)}/>
            </div>

            <div className='create-event-section'>
                <label hmtlFor="create-thumbnail">Event Thumbnail</label>
                <input id="create-thumbnail" type= "file" accept='image/png, image/jpg, image/jpeg' onChange={(e) => uploadThumbnail(e)}/>
            </div>

            {eventThumbnailPrev && <img id="preview-thumbnail" alt = "preview-thumbnail" src= {eventThumbnailPrev}/>}

            <div className='create-event-section'>
                <label hmtlFor="create-images">Event Images</label>
                <input id="create-images" type= "file" accept="image/png, image/jpg, image/jpeg" multiple onChange={(e) => uploadImages(e)}/>
            </div>

            {eventImagesPrev && <PreviewImages images= {eventImagesPrev}/>} 

            <Link to="/"><button type= "button" className='cancel-create-event'>Cancel</button></Link>
            <button type = "submit" className='create-event-submit' form = "create-event">Post</button>

            {!submittable && <p id="create-error">Please fill in all fields properly</p>}
        </form>
  )
}

export default CreateEvent
