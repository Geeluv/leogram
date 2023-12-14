import React, { useContext, useState } from 'react';
import "./PasswordModal.css";
import { UserContext } from '../../utils/UserContext';

const PasswordModal = () => {
    // const { setCurrentNotification, setNotifClass } = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [label, setLabel] = useState("Change password");


    async function submitEmail(e) {
        e.preventDefault();
        setLabel("Sending reset link...");
        const response = await fetch("http://localhost:3000/leogram/users/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
        });
        const data = await response.json();
        if (data.status === "success") {
            setLabel("Reset link sent successfully! Check email.")
            setEmail("");
        }
        // setCurrentNotification(data.message)
        // setNotifClass("notification");
    }

    return (
        <div className='password-modal'>
            <section className='pm'>
                <form className='pm-form' onSubmit={submitEmail}>
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