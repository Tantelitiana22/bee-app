import {useState,useEffect} from 'react';
import Post from './components/posts/post';
import Modals from './components/modal/modal';
import axios from 'axios';
import {Button} from '@material-ui/core';
import './App.css';
import './header.css';

const BASE_URL = 'http://localhost:8080/api/v1/bee/'


function App() {

  const [posts, setPosts] = useState([])

  const [opensignIn,setOpensignIn] = useState(false)
  const [opensignUp,setOpensignUp] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [authTokenType, setAuthTokenType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [newPost, setNewpost] = useState(false)
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    const idUser = localStorage.getItem('userId');
    const userLogged = localStorage.getItem('username');
    setAuthToken(localStorage.getItem('authToken'));
    setAuthTokenType(localStorage.getItem('authTokenType'));
    setUserId(idUser?idUser:'')
    setUsername(userLogged?userLogged:'')
  },[])

  const onDeletePost = (id)=>{
    axios.delete(BASE_URL+'post/delete/'+id,
    {headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
    })
    setPosts(posts.filter(keepPost=>keepPost.id!==id))
  }

  useEffect(()=>{
    authToken? localStorage.setItem('authToken', authToken): localStorage.removeItem('authToken')
    authTokenType? localStorage.setItem('authTokenType', authTokenType): localStorage.removeItem('authTokenType')
    userId? localStorage.setItem('userId', userId): localStorage.removeItem('userId')
    username? localStorage.setItem('username', username): localStorage.removeItem('username')
  },
  [authToken, authTokenType, userId])
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

  async function getConnection(username, password){
    let formData = new FormData();
    formData.append('username',username);
    formData.append('password',password);
    try{
        const connection = await axios.post(`${BASE_URL}login`,formData);
        setAuthToken(connection.data.access_token);
        setAuthTokenType(connection.data.token_type);
        setUserId(connection.data.user_id);

    }catch(error){
      alert("password or user not correct")
        console.error(error.response.data)
    }
  };

  async function getsignUpInformation(username, password, email){
    let data = {
      'username':username,
      'password':password,
      'email':email
    };

    try{
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data,
        url:`${BASE_URL}user/`
      }
      const response = await axios(options);
      setUsername(response.data.username)
      setEmail(response.data.email)
      setPassword(password)
      signIn()
    }catch(error){
      console.error(error.response.data)
    }
  }

  async function newPosthandle(imageUrl){
    const data = {
      "image_url": imageUrl,
      image_url_type:"relative",
      caption,
      creator_id:userId
            }
      const options = {
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        data,
        url:`${BASE_URL}post/`
      }

      try{
        await axios(options)
        window.location.reload();
      }catch(error){
        console.error(error.response.data)
      }

  }
  async function setNewPostImage(){
    const formatData = new FormData();
    formatData.append('image',image)
    try{
      const newImages = await axios.post(`${BASE_URL}post/image`,formatData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })
      newPosthandle(newImages.data.filename)
    }catch(error){

        console.log(error)
    }
  }

  const signIn = (event)=>{
    event?.preventDefault();
    setOpensignIn(false);
    getConnection(username, password);

  }

const signOut =(event)=>{
  event.preventDefault();
  setUsername('');
  setPassword('');
  setAuthToken(null);
  setAuthTokenType(null);
  setOpensignIn(false);
}

const signUp = (event)=>{
  event?.preventDefault();
  setOpensignUp(false);
  getsignUpInformation(username, password,email);
}

const handleNewPost = (event)=>{
  event.preventDefault();
  setNewPostImage();
  setNewpost(false);
}

  return (
    <div className="app">
      <Modals.ModalSignIn isOpen={opensignIn}
      authToken={authToken}
      setIsOpen={setOpensignIn}
      signIn={signIn}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      />

      <Modals.ModalSignUp isOpen={opensignUp}
      setIsOpen={setOpensignUp}
      signUp={signUp}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      email={email}
      setEmail={setEmail}
      />

      <Modals.ModalNewPost isOpen={newPost}
      setIsOpen={setNewpost}
      image={image}
      setImage={setImage}
      caption={caption}
      setCaption={setCaption}
      handleNewPost={handleNewPost}
      />

      <div className="app_header">
          <img
          src="bee.png"
          alt="beeApp"
          className="app_head_image"
          />
          <div className="app_header_button">
            {!(authToken && authTokenType)?
            <div>
              <Button onClick={()=>setOpensignIn(true)}>login</Button>
              <Button onClick={()=>setOpensignUp(true)}>signup</Button>
            </div>
          :
          <div>
            <Button onClick={()=>setNewpost(true)}>Add Post</Button>
            <Button onClick={e=>signOut(e)}>logOut</Button>
          </div>
          }
          </div>
      </div>
      <div className="app_posts">
        {posts.map(post=>(<Post post={post}
          onDeletePost={onDeletePost}
          currentUser={username}
          authToken={authToken}
          key={post.id}/>))}
      </div>
    </div>
  );
}

export default App;
