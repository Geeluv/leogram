import React, { useContext, useEffect, useState } from 'react'
import "./FindFriends.css"
import { setImageLink } from '../../utils/imageHandler';
import { UserContext } from '../../utils/UserContext';
import { NavLink } from 'react-router-dom';

const FollowFriend = ({ currentUser, user, following, setCurrentNotification, setNotifClass }) => {
    const [followText, setFollowText] = useState("Follow");

    async function followFriend(userId, username) {
        const response = await fetch("http://localhost:3000/leogram/users/follow-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, username }),
            credentials: "include"
        })
        const data = await response.json();
        data.message === "Follow" ? setFollowText("Unfollow") : setFollowText("Follow")
        setNotifClass("notification");
        setCurrentNotification(`You ${data.message}ed ${username}`);
    }

    useEffect(() => {
        following.includes(user?._id) ?
            setFollowText("Unfollow") :
            setFollowText("Follow")
    }, [])

    return (
        <>
            {currentUser?.user._id !== user._id && <div className='ff-single'>
                <NavLink to={/profile/ + user._id} style={{ backgroundImage: `url("http://localhost:3000/uploads/${setImageLink(user.image)}` }} className='ff-img'></NavLink>
                <span className='ff-user-details'>{user.username} <i>- {(user.bio).split(0, 50)}</i></span>
                <button onClick={() => followFriend(user._id, user.username)} className='ff-follow-btn'>
                    {followText}
                </button>
            </div>}
        </>
    )
}

const FindFriends = () => {
    const [users, setUsers] = useState(null);
    const currentUser = useContext(UserContext);
    const [following, setFollowing] = useState([]);
    const { setCurrentNotification, setNotifClass } = useContext(UserContext);

    async function fetchAllUsers() {
        const response = await fetch("http://localhost:3000/leogram/users/find-friends", { credentials: "include" })
        const data = await response.json();
        if (response.ok) {
            setUsers(data.allUsers);
            setFollowing(data.user)
        }
        else {
            setNotifClass("notification");
            setCurrentNotification(data.message);
        }
    }

    const followProps = {
        currentUser,
        following,
        setCurrentNotification,
        setNotifClass
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    return (
        <div className='find-friends'>
            <div className='ff-wrapper'>
                {users && users.map(user => (
                    <FollowFriend
                        key={user._id}
                        user={user}
                        {...followProps}
                    />
                ))}
            </div>
        </div>
    )
}

export default FindFriends