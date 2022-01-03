import React, {useState,useEffect, useRef} from 'react';
import {Input, Button} from '@material-ui/core';
import './modal.css';


function ModalSignIn({isOpen, setIsOpen, signIn,
    username, setUsername, password, setPassword}) {

    const ref = useRef(null);

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target) && isOpen) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return (
    <div className='modal' style={{display: isOpen ? 'block' : 'none'}}>
        <div  className='modal-content' ref={ref}>
            <form className="app_signin">
                <center>
                    <img src="https://play-lh.googleusercontent.com/hc3-60fDkOcQlTAgzBbKuh-3EdT8dWax7BroX4zjW8_iKMlOFaE3orm9IUrP7V9zRLw"
                    alt="beeApp"
                    className="app_head_image" />
                </center>
                <Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signIn}>Login</Button>
            </form>
        </div>
    </div>
    );
}

function ModalSignUp({isOpen, setIsOpen, signUp,
    username, setUsername, password, setPassword, email, setEmail}) {

    const ref = useRef(null);
    const [passwordMessage, setpasswordMessage] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target) && isOpen) {
            setIsOpen(false);
        }
    };

    const deactivateMessagePassword = (event)=>{
        setPassword(event.target.value);
        setpasswordMessage(false)
    }
    const activateMessagePassword = (event)=>{
        setConfirmPassword(event.target.value);
        setpasswordMessage(true)
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return (
    <div className='modal' style={{display: isOpen ? 'block' : 'none'}}>
        <div  className='modal-content' ref={ref}>
            <form className="app_signin">
                <center>
                    <img src="https://play-lh.googleusercontent.com/hc3-60fDkOcQlTAgzBbKuh-3EdT8dWax7BroX4zjW8_iKMlOFaE3orm9IUrP7V9zRLw"
                    alt="beeApp"
                    className="app_head_image" />
                </center>
                <Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <Input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e)=>deactivateMessagePassword(e)}
                    id='Password'
                />
                <Input
                    placeholder="confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>activateMessagePassword(e)}
                />
                {(password!==confirmPassword && passwordMessage)?<strong style={{color: 'red'}}>password not identical</strong>:<></>}
                <Button type="submit" onClick={signUp} disabled={!(password===confirmPassword && username && password && email)?true:false}>Submit</Button>
            </form>
        </div>
    </div>
    );
}



function ModalNewPost({isOpen, setIsOpen, image,
        setImage, caption, setCaption,handleNewPost}) {

    const ref = useRef(null);

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target) && isOpen) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    const handleChange = event => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

    return (
    <div className='modal' style={{display: isOpen ? 'block' : 'none'}}>
        <div  className='modal-content' ref={ref}>
            <form className="app_signin">
                <center>
                    <img src="https://play-lh.googleusercontent.com/hc3-60fDkOcQlTAgzBbKuh-3EdT8dWax7BroX4zjW8_iKMlOFaE3orm9IUrP7V9zRLw"
                    alt="beeApp"
                    className="app_head_image" />
                </center>
                <Input
                    type="file"
                    id='fileInput'
                    onChange={e=>handleChange(e)}
                />
                <Input
                    placeholder="Enter a caption"
                    type="text"
                    value={caption}
                    onChange={(e)=>setCaption(e.target.value)}
                />
                <Button type="submit" onClick={e=>handleNewPost(e)} disabled={!(image && caption)?true:false}>Upload post</Button>
            </form>
        </div>
    </div>
    );
}

const Modals = {ModalSignIn, ModalSignUp, ModalNewPost}
export default Modals;