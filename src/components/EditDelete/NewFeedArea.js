import React from 'react'
import NewFeedPost from './NewFeedPost'
import dummy_pfp from "../../images/dummy-pfp.png"
import dummy_post from "../../images/dummy-post.jpg"
import rutgers_park from "../../images/rutgers-park.jpg"
import PostButton from '../createEvent/PostButton'

const FeedArea = () => {
  return (
    <>

    <p className="filter-btn">Filter</p>
 
    <div className ="feed-area">
        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 1" title = "Firework showing at Fairgrounds!" 
        thumbnail= {dummy_post} numBookmarked = "400" eventTag= "Recreation"/>


        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 2" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>

        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 3" title = "Firework showing at Fairgrounds!" 
        thumbnail= {dummy_post} numBookmarked = "400" eventTag= "Recreation" />

        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>

        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>
        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>
        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>
        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>
        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>
        <NewFeedPost pfp = {dummy_pfp} posterName = "Company 4" title = "Basketball Tournament @ Ruckers!" 
        thumbnail= {rutgers_park} numBookmarked = "400" eventTag= "Recreation"/>
    </div>

    <div>
      <PostButton />
    </div>
    </>
  )
}

export default FeedArea
