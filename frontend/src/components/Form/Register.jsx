import React, { useContext, useState } from 'react'
import "./Form.css"
import { UserContext } from '../../utils/UserContext'

const Register = ({ setToggleForm }) => {
    const { setCurrentNotification } = useContext(UserContext)
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    async function handleChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    async function registerUser(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/leogram/users/signup", {
            method: "POST",
            body: JSON.stringify({ ...userData }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setToggleForm("login");
        setCurrentNotification(`Registration Successful. Welcome ${data.username}!`)
    }
    return (
        <>
            <form onSubmit={registerUser} className='user-form'>
                <input value={userData.username} name='username' onChange={handleChange} className='user-input' type='text' placeholder='Username' required />
                <input value={userData.email} name='email' onChange={handleChange} className='user-input' type='email' placeholder='Email' required />
                <input value={userData.password} name='password' onChange={handleChange} className='user-input' type='password' placeholder='Password' required />
                <button className='user-btn' type='submit'>Sign Up</button>
            </form>
        </>
    )
}

export default Register;