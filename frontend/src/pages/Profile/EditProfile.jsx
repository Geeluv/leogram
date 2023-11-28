import React, { useContext, useState } from 'react';
import "./Profile.css";
import { BiImage, BiPhotoAlbum } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
import { setImageName } from '../../utils/imageHandler';

const EditProfile = () => {
    const { setReMount } = useContext(UserContext)
    const navigate = useNavigate()
    const formData = new FormData();
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);

    async function saveProfile(e) {
        e.preventDefault();
        formData.set("username", username);
        formData.append("profile_photo", profileImage[0]);
        formData.append("profile_banner", bannerImage[0]);

        const response = await fetch("http://localhost:3000/leogram/users/edit-profile", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        if (response.ok) {
            navigate("/profile")
            setReMount("edited");
        }
        formData.set("username", "");
        formData.set("profile_photo", []);
        formData.set("profile_banner", []);
    }
    return (
        <div className='edit-profile ep'>
            <form onSubmit={saveProfile}
                className='ep-form'
            >
                <input value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='ep-input'
                    type='text'
                    name='username'
                    placeholder='Username'
                />
                <div>
                    <label
                        className='ep-img'
                        htmlFor='profileimg'>
                        <BiImage /> Profile photo
                    </label>
                    <span
                        style={{ fontSize: "0.75rem" }}>
                        {setImageName(profileImage)}
                    </span>
                </div>
                <input
                    onChange={(e) => setProfileImage(e.target.files)}
                    style={{ display: "none" }}
                    id="profileimg"
                    type='file'
                    name='profileimg'
                />
                <div>
                    <label
                        className='ep-img'
                        htmlFor='bannerimg'>
                        <BiPhotoAlbum /> Banner image
                    </label>
                    <span
                        style={{ fontSize: "0.75rem" }}>
                        {setImageName(bannerImage)}
                    </span>
                </div>
                <input
                    onChange={(e) => setBannerImage(e.target.files)}
                    style={{ display: "none" }}
                    id="bannerimg"
                    type='file'
                    name='bannerimg'
                />
                <button className='ep-btn'>
                    Save
                </button>
            </form>
        </div>
    )
}

export default EditProfile