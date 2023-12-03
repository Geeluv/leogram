import React, { useContext, useState } from 'react';
import "./Profile.css";
import { BiImage, BiPhotoAlbum } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
import { setImageName } from '../../utils/imageHandler';

const EditProfile = () => {
    const { setCurrentNotification, setNotifClass, setReMount } = useContext(UserContext);
    const navigate = useNavigate()
    const { id } = useParams();
    const formData = new FormData();
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);

    async function saveProfile(e) {
        e.preventDefault();
        formData.set("username", username);
        formData.set("bio", bio);
        formData.append("profile_photo", profileImage[0]);
        formData.append("profile_banner", bannerImage[0]);

        const response = await fetch("http://localhost:3000/leogram/users/edit/" + id, {
            method: "POST",
            body: formData,
            credentials: "include"
        });
        const data = await response.json()
        if (response.ok) {
            navigate("/profile/" + id)
            setReMount("edited");
            setNotifClass("notification");
            setCurrentNotification("Profile saved!")
        } else {
            setNotifClass("notification");
            setCurrentNotification(data.message)
        }
        formData.set("username", "");
        formData.set("bio", "");
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
                    className='ep-input1'
                    type='text'
                    name='username'
                    placeholder='Username'
                />
                <input value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='ep-input2'
                    type='text'
                    name='bio'
                    placeholder='Bio'
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