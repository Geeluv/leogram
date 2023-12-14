import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [label, setLabel] = useState("Save new password");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function changePassword(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setLabel("Passwords do not match!");
            return;
        }
        setLabel("Saving new password..");

        const response = await fetch("http://localhost:3000/leogram/users/reset-password/" + token, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password })
        });
        const data = await response.json();
        setLabel(data.message);
        if (data.status === "success") {
            localStorage.removeItem("leogram-user-profile");
        }

    }

    return (
        <div className='password-modal'>
            <section className='pm'>
                <form className='pm-form' onSubmit={changePassword}>
                    <label>{label}</label>
                    <input className='pm-input'
                        type="password" value={password}
                        placeholder='New password'
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <input className='pm-input'
                        type="password" value={confirmPassword}
                        placeholder='Confirm new password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                    <button className='pm-btn'>
                        Submit
                    </button>
                </form>
            </section>
        </div>
    )
}

export default ResetPassword