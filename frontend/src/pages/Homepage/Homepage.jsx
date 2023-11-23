import React, { useEffect, useState } from 'react'
import "./Homepage.css"
import Image from "../../assets/images/leo-chat.png"
import Register from '../../components/Form/Register'
import Login from '../../components/Form/Login'
import { useNavigate } from 'react-router-dom'
import Notification from "../../components/Notification/Notification"

const Homepage = () => {
    const [toggleText, setToggleText] = useState("Already have an account? Sign In!");
    const [toggleForm, setToggleForm] = useState("register");
    const [isUser, setIsUser] = useState(() => {
        return localStorage.getItem("leogram-user-profile");
    });
    const navigate = useNavigate()

    function toggle() {
        if (toggleForm === "login") {
            setToggleForm("register");
            setToggleText("Already have an account? Sign In!");
        }
        else {
            setToggleForm("login")
            setToggleText("Don't have an account? Sign Up!")
        }
    }

    useEffect(() => {
        if (isUser) {
            navigate("/feed");
        }
    }, [])
    return (
        <>
            <div className='homepage'>
                <Notification />
                <div className='image'>
                    <img src={Image} alt='logo image' />
                    <h1>LeoGram</h1>
                </div>
                <div className='user-entry'>
                    {toggleForm === "register" ? <Register setToggleForm={setToggleForm} /> : <Login />}
                    <p className='toggle-form' onClick={toggle}>{toggleText}</p>
                </div>
                <div className='homepage-footer'>

                </div>
            </div>
        </>
    )
}

export default Homepage