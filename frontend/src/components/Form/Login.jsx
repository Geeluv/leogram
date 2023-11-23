import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

const Login = () => {
    const user = useContext(UserContext);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    async function loginUser(e) {
        e.preventDefault();
        await fetch("http://localhost:3000/leogram/users/signin", {
            method: "POST",
            body: JSON.stringify({ ...userData }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        const authUser = await fetch("http://localhost:3000/leogram/users/user", {
            credentials: "include"
        });
        const loggedInUser = await authUser.json();
        localStorage.setItem("leogram-user-profile", JSON.stringify(loggedInUser.username));
        user.setUser(loggedInUser);
        navigate("/feed");
        user.setCurrentNotification(`Login successful. Welcome ${loggedInUser.username}`);
        user.setNotifClass("notification");
    }

    return (
        <>
            <form onSubmit={loginUser} className='user-form'>
                <input name='email' value={userData.email} onChange={handleChange} className='user-input' type='email' placeholder='Email' required />
                <input name='password' value={userData.password} onChange={handleChange} className='user-input' type='password' placeholder='Password' required />
                <button className='user-btn' type='submit'>Sign In</button>
            </form>
        </>
    )
}

export default Login