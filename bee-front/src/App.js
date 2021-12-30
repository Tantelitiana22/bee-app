import {useState,useEffect} from 'react';
import Post from './components/posts/post';
import Modal from './components/modal/modal';
import axios from 'axios';
import {Button} from '@material-ui/core';
import './App.css';
import './header.css';

const BASE_URL = 'http://localhost:8000/'


function App() {

  const [posts, setPosts] = useState([])

  const [opensignIn,setOpensignIn] = useState(false)
  const [opensignUp,setOpensignUp] = useState(false)

  useEffect(()=>{
    const getAllPost = async()=>{
      try{
        const result = await axios.get(`${BASE_URL}post/all`)
        const sortResult = result.data.sort((a, b)=>{
          const t_a = a.timestamp.split(/[-T:]/);
          const t_b = b.timestamp.split(/[-T:]/);
          const d_a = new Date(t_a[0],t_a[1],t_a[2], t_a[3],t_a[4],t_a[5])
          const d_b = new Date(t_b[0],t_b[1],t_b[2], t_b[3],t_b[4],t_b[5])
          return d_b-d_a
        })
        setPosts(sortResult)
      }catch(e){
        console.error(e)
      }

    }
    getAllPost()
  }, [])

  const signIn = (event)=>{}

  return (
    <div className="app">
      <Modal isOpen={opensignIn} setIsOpen={setOpensignIn}/>
      <div className="app_header">
          <img
          src="https://play-lh.googleusercontent.com/hc3-60fDkOcQlTAgzBbKuh-3EdT8dWax7BroX4zjW8_iKMlOFaE3orm9IUrP7V9zRLw"
          alt="beeApp"
          className="app_head_image"
          />
          <div className="app_header_button">
            <Button onClick={()=>setOpensignIn(true)}>login</Button>
            <Button onClick={()=>setOpensignUp(true)}>signup</Button>
          </div>
      </div>
      <div className="app_posts">
        {posts.map(post=>(<Post post={post} key={post.id}/>))}
      </div>
    </div>
  );
}

export default App;
