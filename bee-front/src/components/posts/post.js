import React, {useState, useEffect} from 'react';
import './post.css'
import {Avatar, Button} from '@material-ui/core'

const BASE_URL = 'http://localhost:8000/'

function Post({post}) {
  const [imageUrl, setImageUrl] = useState('')
  const [comments, setComments] = useState([])

  useEffect(()=>{
    if(post.image_url_type === 'absolute'){
      setImageUrl(post.image_url)
    }else{
      setImageUrl(BASE_URL+post.image_url)
    }

  },[])

  useEffect(()=>{
    setComments(post.comments)
  }, [])

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          alt="catalin"
          src=""
        />
        <div className="post_head_info">
          <h3>{post.user.username}</h3>
        </div>
        <Button className='postDelete'>Delete</Button>
      </div>

      <img
        className="post_image"
        src={imageUrl}
        alt={imageUrl}
      />
      <h4 className="post_text">{post.caption}</h4>

      <div className="post_comments">
          {comments.map(comment=>{
            return(
              <p key={comment.username}>
                <strong>{comment.username}</strong>:
                  {comment.text}
              </p>
            )
          })}
      </div>
    </div>
  );
}

export default  Post;