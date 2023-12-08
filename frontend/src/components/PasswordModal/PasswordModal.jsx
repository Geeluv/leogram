import React, { useContext, useState } from 'react'
import "./PasswordModal.css"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { UserContext } from '../../utils/UserContext'

const PasswordModal = ({ setIsModalVisible }) => {
    const { setCurrentNotification, setNotifClass } = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [label, setLabel] = useState("Change password");


    async function changePassword(e) {
        e.preventDefault();
        setLabel("Sending reset link...");
        const response = await fetch("http://localhost:3000/leogram/users/reset-password", {
            method: "POST",
            headers: { "ContenT-Type": "application/json" },
            body: JSON.stringify({ email: email }),
            credentials: "include"
        });
        const data = await response.json();
        if (data.status === "success") {
            setLabel("Reset link sent successfully!")
            setEmail("");
        }
        setCurrentNotification(data.message)
        setNotifClass("notification");
    }

    return (
        <div className='password-modal'>
            <section className='pm'>
                <div className='close-pm'
                    onClick={() => setIsModalVisible(false)}>
                    <AiOutlineCloseCircle />
                </div>
                <form className='pm-form' onSubmit={changePassword}>
                    <label>{label}</label>
                    <input className='pm-input'
                        type="email" value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <button className='pm-btn'>
                        Submit
                    </button>
                </form>
            </section>
        </div>
    )
}

export default PasswordModal