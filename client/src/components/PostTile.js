import React from "react"

const PostTile = ({title, content,postDate}) => {
  return(
    <div className="callout">
      <h5> {title} </h5>
      <h5> {content} </h5>
      <p> {postDate} </p>
    </div>
  )
}

export default PostTile
