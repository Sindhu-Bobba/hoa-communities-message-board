import React from "react"

const PostTile = ({ content,postDate}) => {
  return(
    <div className="callout">
      <h5> {content} </h5>
      <p> {postDate} </p>
    </div>
  )
}

export default PostTile
