import React, {useState, useEffect, useRef} from 'react';
import {Input, Button} from '@material-ui/core';
import './modal.css';


export default function Modal({isOpen, setIsOpen}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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

    const signIn = (event)=>{
        event.preventDefault();
        setIsOpen(false)
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
