import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { BiDiamond, BiEdit, BiLogoFacebook, BiLogoGmail, BiLogoGoogle, BiLogoTwitter, BiLogoZoom } from "react-icons/bi"
import { NavLink } from 'react-router-dom'
import { setImageLink } from '../../utils/imageHandler'

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [bannerLink, setBannerLink] = useState("");
    const [profileImageLink, setProfileImageLink] = useState("");
    async function fetchProfile() {
        const response = await fetch("http://localhost:3000/leogram/users/profile", {
            credentials: "include"
        })
        const data = await response.json();
        setUserData(data);
        setBannerLink(setImageLink(data?.banner_image))
        setProfileImageLink(setImageLink(data?.image))
    }

    const bannerStyle = {
        backgroundImage: `url(http://localhost:3000/uploads/${bannerLink})`
    }
    const imageStyle = {
        backgroundImage: `url(http://localhost:3000/uploads/${profileImageLink})`
    }
    useEffect(() => {
        fetchProfile();
    }, [])
    return (
        <>
            <div className='profile'>
                <div className='main-profile-container'>
                    <div className='profile-image-wrapper'>
                        <div className='profile-banner-container' style={bannerStyle}>
                        </div>
                        <div className='profile-image-container'>
                            <div className='profile-image' style={imageStyle}></div>
                        </div>
                        <div className='profile-details'>
                            <div></div>
                            <div className='pd-wrapper'>
                                <div className='pd-container'>
                                    <div className='pd-demographics'>
                                        <span>{userData?.username}</span>
                                        <span>Leo level:<b style={{ color: "rgb(221, 74, 21)" }}>{userData?.leo_level} <BiDiamond /></b></span>
                                        <span>Maiduguri, Borno</span>
                                    </div>
                                    <NavLink to="/edit-profile" className='profile-edit'>
                                        <BiEdit className='pd-edit-icon' /> Edit profile
                                    </NavLink>
                                </div>
                                <div className='profile-user-icons'>
                                    <BiLogoFacebook />
                                    <BiLogoGoogle />
                                    <BiLogoGmail />
                                    <BiLogoZoom />
                                    <BiLogoTwitter />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='profile-body'></div>
                </div>
                <div className='right-profile-bar'>

                </div>
            </div>
        </>
    )
}

export default Profile