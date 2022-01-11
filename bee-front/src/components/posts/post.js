import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Avatar, Button, Input} from '@material-ui/core'
import './post.css'

const BASE_URL = 'http://localhost:8080/api/v1/bee/'

function Post({post, currentUser, authToken, onDeletePost}) {
  const [imageUrl, setImageUrl] = useState('')
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(()=>{
    if(post.image_url_type === 'absolute'){
      setImageUrl(post.image_url)
    }else{
      setImageUrl(BASE_URL+post.image_url)
    }

  },[])

  async function retrieveComment(){
    try{
      const response = await axios.get(BASE_URL+'comment/all/'+post.id);
      setComments(response.data);
    }catch(error){
      console.error(error);
    }
  }

  async function createNewComment(){
    const data = {
        'username':currentUser,
        "text": newComment,
        "post_id": post.id
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    },
      data,
      url:BASE_URL+'comment/'
    }

    try{
      await axios(options);
      retrieveComment();
    }catch(error){
      console.error(error.response.data)
    }
  }

  useEffect(()=>{
    setComments(post.comments)
  }, [])

  const postComment =(event)=>{
    event.preventDefault();
    createNewComment();
    setNewComment('');
  }

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
        <Button className='postDelete'
        disabled={(currentUser!==post.user.username)}
        onClick={()=>onDeletePost(post.id)}
        >Delete</Button>
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
              <p key={comment.id}>
                <strong>{comment.username}</strong>:
                  {comment.text}
              </p>
            )
          })}
      </div>
      {authToken &&
      <form className="post_commentbox">
        <Input className="post_input"
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={e=>setNewComment(e.target.value)}
        />
        <Button className='post_button' type='submit' disabled={!newComment} onClick={postComment}>post</Button>
      </form>
      }
    </div>
  );
}

export default  Post;