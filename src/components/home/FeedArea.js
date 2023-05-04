import React, {useState, useEffect} from 'react'
import FeedPost from './FeedPost'
import dummy_pfp from "../../images/dummy-pfp.png"
import dummy_post from "../../images/dummy-post.jpg"
import rutgers_park from "../../images/rutgers-park.jpg"
import PostButton from '../createEvent/PostButton'
import axios from 'axios'

const FeedArea = ({showFilterButton, query}) => {
  const[allowClickEvent, setClickEvent] = useState(true)
  const[showFilters, setShowFilters] = useState(false)
  const[filter, setFilter] = useState(new Set()) //upon first render of page, want to show all events
  const[updatePage, setUpdatePage] = useState(true)
  const eventTags = ["Recreation", "Volunteer", "Entertainment", "Food", "Adult"] //Need this event tags array for check boxes

  function allowClickableEvent(){   
    setClickEvent(!allowClickEvent)
  }

  function giveClickEvent(){
    return allowClickEvent
  }

  function alterFilter(e){
    const tag = e.target.value
    
    //constant time so not bad
    if(filter.has(tag)){
      filter.delete(tag)
    }
    else{
      filter.add(tag)
    }
  }

  function applyFilter(){
    //Just in case people want to be weird. no filter applied
    if(filter.size ===0){
      setFilter(new Set())
      filter.add("all")
    }
    setShowFilters(!showFilters)
    setUpdatePage(!updatePage)
  }


  // const [post, setPost] = useState([{poster: "", title: "", type: "", location: "", description: "", thumbnail: "", images: ""}]);
  const [post, setPost] = useState([]);
  const[error, setError] = useState("");

  
    useEffect(() => {
      
      //for search event. "creates new" feedArea each time?
      if(query !== ""){
        axios.post("https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/search-event.php",{
          query:query
        }).then(val =>{
          setPost(val.data)
        })
        
        return
      }
      
      //For first render. All events should show
      if(filter.size === 0){
        filter.add("all")
      }

      const filterList = Array.from(filter)
      const fd = new FormData()
      for(let i = 0; i < filterList.length; i++){
        fd.append('filters[]', filterList[i])
      }

      let siteURL = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/load-event.php"
      let localURL= "http://localhost/load-event.php"
      axios.post(siteURL, fd)
      // axios.get("http://localhost/load-event.php")
      .then(val => {

        if(val.data !== "Nothing"){
          setPost(val.data)
        }
        
      })

    }, [updatePage]);
    

  return (
    <>

    {/* Filter section */}
    {showFilterButton && <p className='filter-btn' onClick={() => {setShowFilters(!showFilters); setFilter(new Set())}}>Filters</p>}
    {showFilters && eventTags.map(event => {
      return(
      <div className='filter-choice'>
      <input className = "filter-box" type= "checkbox" id={event} value={event} onChange={e=>alterFilter(e)}/>
      <label className = "filter-label" htmlFor= {event}>{event}</label> 
      </div>
      )})}
    {showFilters && <button id = 'filter-submit-btn' onClick={applyFilter}>Filter Posts</button>}


    <div className ="feed-area">
    {post.map((value, idx) => {
          return (
            <FeedPost post_id = {post[idx].post_id} pfp = {dummy_pfp} posterName = {post[idx].poster} title = {post[idx].title} eventID = {post[idx].post_id} 
        thumbnail= {`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442b/uploads/${post[idx].thumbnail}`} numBookmarked = "400" eventTag= {post[idx].type} allowClickEvent={allowClickEvent}/>
           )
          })}
    </div>
    </>
  )
}

export default FeedArea