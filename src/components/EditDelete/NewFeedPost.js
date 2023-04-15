import React from 'react'

const FeedPost = ({pfp, posterName, title, thumbnail, numBookmarked, eventTag}) => {
  return (
    <>
        <div className="post-feedview">
                    
            <div className="lpost-feedview">
               
            </div>
            
            <div className = "rpost-feedview">
                

                <img className ="post-thumbnail" src={thumbnail} alt= {`${posterName}'s thumbnail`} />
                <p className="title-feedview">{title}</p>
                
                <div className="post-footer-feedview">
                    <p className = "num-bookmarked-feedview">{numBookmarked} people are following this event</p>
                    <p className="tags-feedview">{eventTag}</p>
                </div>
                <button className="btn btn-primary me-5"> Edit </button>
                <button className="btn btn-primary me-5">Delete</button>

            </div>


        </div>
    </>
  )
}

export default FeedPost
