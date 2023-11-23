import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import "./Feed.css";
import Post from '../../components/Post/Post';
import ChatRoom from '../ChatRoom/ChatRoom';
import PostForm from '../../components/Post/PostForm';
import { UserContext } from '../../utils/UserContext';

const Feed = () => {
    const { setCurrentNotification, setNotifClass } = useContext(UserContext);
    const [isActive, setIsActive] = useState(1);
    const [displayPage, setDisplayPage] = useState("feedpost");
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState([]);
    const [posts, setPosts] = useState(null);
    const [reload, setReload] = useState(false);
    const [emojiPicker, setEmojiPicker] = useState(false);

    const fullview = ["blog", "chatroom"];
    const activeSideBar = { isActive, setIsActive, setDisplayPage, fullview }
    const postProps = { uploadPost, postContent, setPostContent, setPostImage, postImage, emojiPicker, setEmojiPicker }

    async function uploadPost(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("content", postContent);
        formData.append("postimage", postImage[0]);
        await fetch("http://localhost:3000/leogram/users/create-post", {
            method: "POST",
            body: formData,
            credentials: "include"
        })
        setPostContent("")
        setPostImage([]);
        setReload(true)
        setCurrentNotification("Post uploaded successfully");
        setNotifClass("notification");
        setEmojiPicker(false)
    }

    useEffect(() => {
        async function fetchAllPosts() {
            const response = await fetch("http://localhost:3000/leogram/users/posts", {
                credentials: "include"
            });
            if (response.ok) {
                const allPosts = await response.json();
                setPosts(allPosts)
            }
        }
        fetchAllPosts();
        setReload(false)
    }, [reload])
    return (
        <>
            <div className={fullview.includes(displayPage) ? "fullview" : "feedpage"}>
                {
                    !fullview.includes(displayPage) && (
                        <div className='feed-sidebar'>
                            <Sidebar {...activeSideBar} />
                        </div>)
                }
                <div className='feed'>
                    {(displayPage === "feedpost" || displayPage === "username") && <PostForm {...postProps} />}
                    {(displayPage === "feedpost" || displayPage === "username") && (
                        posts && posts?.map(post => (
                            <Post key={post?._id} post={post} setReload={setReload} />
                        )))}
                </div>
                <div className='right-bar'></div>
            </div>
        </>
    )
}

export default Feed