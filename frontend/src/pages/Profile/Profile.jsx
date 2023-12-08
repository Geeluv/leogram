import React, { useContext, useEffect, useState } from 'react';
import "./Profile.css";
import { BiDiamond, BiEdit, BiLogoFacebook, BiLogoGmail, BiLogoGoogle, BiLogoTwitter, BiLogoZoom } from "react-icons/bi";
import { NavLink, useParams } from 'react-router-dom';
import { setImageLink } from '../../utils/imageHandler';
import { UserContext } from '../../utils/UserContext';
import PasswordModal from '../../components/PasswordModal/PasswordModal';

const Profile = () => {
    const { id } = useParams()
    const user = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [bannerLink, setBannerLink] = useState("");
    const [followText, setFollowText] = useState("Follow");
    const [profileImageLink, setProfileImageLink] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    async function fetchProfile() {
        const response = await fetch(`http://localhost:3000/leogram/users/profile/${id}`, {
            credentials: "include"
        })
        const data = await response.json();
        setUserData(data);
        setBannerLink(setImageLink(data?.banner_image));
        setProfileImageLink(setImageLink(data?.image));
        (data.followers).includes(user?.user?._id) ? setFollowText("Following") : setFollowText("Follow")
    }

    async function followUser() {
        const response = await fetch("http://localhost:3000/leogram/users/follow-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id, username: userData.username }),
            credentials: "include"
        })
        const data = await response.json();
        data.message === "Follow" ? setFollowText("Following") : setFollowText("Follow")
    }

    const bannerStyle = {
        backgroundImage: `url(http://localhost:3000/uploads/${bannerLink})`
    }

    const imageStyle = {
        backgroundImage: `url(http://localhost:3000/uploads/${profileImageLink})`
    }

    useEffect(() => {
        fetchProfile();
    }, [id])

    return (
        <>
            <div className='profile'>
                {(isModalVisible && user?.user?._id === id) && <PasswordModal setIsModalVisible={setIsModalVisible} />}
                <div className='main-profile-container'>

                    <div className='profile-image-wrapper'>
                        <div className='profile-banner-container' style={bannerStyle}></div>
                        <div className='profile-image-container'>
                            <div className='profile-image' style={imageStyle}></div>
                        </div>
                        <div className='profile-details'>
                            <div className='pd-wrapper'>
                                <div className='pd-container'>
                                    <div className='pd-demographics'>
                                        <div>
                                            <span>
                                                @{userData?.username}
                                            </span>
                                            <span>Leo level : <b style={{ color: "rgb(221, 74, 21)" }}>
                                                {userData?.leo_level}
                                                <BiDiamond />
                                            </b>
                                            </span>
                                            <span>Maiduguri, Borno</span>
                                        </div>
                                        <div className='pd-bio'><i>{userData?.bio}</i></div>
                                    </div>
                                    <section className='profile-edit-btn'>
                                        {user?.user?._id === id &&
                                            <NavLink to={"/edit/" + user?.user?._id} className='profile-edit'>
                                                <BiEdit className='pd-edit-icon' /> Edit profile
                                            </NavLink>}
                                        {user?.user?._id !== id && <span onClick={followUser} className='follow-user'>
                                            {followText}
                                        </span>}
                                        {user?.user?._id === id && <span
                                            className='profile-edit edit-pwd'
                                            onClick={() => setIsModalVisible(true)}>Change password
                                        </span>}
                                    </section>

                                    <div className='pd-followers'>
                                        <span>
                                            <b>{userData?.followers.length}</b>
                                            Followers
                                        </span>
                                        <span>
                                            <b>{userData?.following.length}</b>
                                            Following
                                        </span>
                                    </div>
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
                    {/* <div className='profile-body'>
                    </div> */}
                </div>
                {/* <div className='right-profile-bar'>

                </div> */}
            </div>
        </>
    )
}

export default Profile