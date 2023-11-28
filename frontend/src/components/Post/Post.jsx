import TestImage from "../../assets/images/leogram-test-image.jpg";
import { FaComment, FaShare, FaThumbsUp, } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi';
import React, { useContext, useEffect, useRef } from 'react'
import ReactTimeAgo from 'react-time-ago'
import Comment from '../Comment/Comment';
import "./Post.css";
import { useState } from "react";
import convertTime from "../../utils/timeConvert";
import verifyFileType from "../../utils/verifyFileType";
import DeleteModal from "../DeleteModal/DeleteModal";
import { UserContext } from "../../utils/UserContext";
import { setImageLink } from "../../utils/imageHandler";

const Post = ({ post, setReload }) => {
    const { setCurrentNotification, setNotifClass } = useContext(UserContext);
    const user = useContext(UserContext);
    const [commentClass, setCommentClass] = useState("hide-comment");
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const commentRef = useRef()
    const [comments, setComments] = useState(null);
    const [commentAction, setCommentAction] = useState(false);
    const [isLiked, setIsliked] = useState(() => post?.likes.includes(post?.author?.username));
    const [likesCount, setLikesCount] = useState(() => post?.likes.length)

    const photoStyle = {
        backgroundImage: `url(http://localhost:3000/uploads/${setImageLink(post?.author?.image)})`
    }

    async function deletePost() {
        const response = await fetch("http://localhost:3000/leogram/users/post/delete", {
            method: "DELETE",
            body: JSON.stringify({ postId: post._id }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        const data = await response.json();
        if (response) {
            setReload(true);
            setCurrentNotification(data.message);
            setNotifClass("notification");
        }
        setToggleDeleteModal(false);
    }

    async function likePost() {
        const response = await fetch("http://localhost:3000/leogram/users/post/like", {
            method: "POST",
            body: JSON.stringify({ postId: post._id }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        const data = await response.json();
        if (response.ok) {
            if (data.message) {
                setCurrentNotification(`You liked ${post?.author?.username}'s post`);
                setNotifClass("notification");
                setIsliked(true);
            } else {
                setIsliked(false)
            }
            setLikesCount(data.post.likes.length);
        }
        setToggleDeleteModal(false)
    }

    async function uploadComment(e) {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/leogram/users/post/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment: commentRef.current.value, postId: post?._id }),
            credentials: "include"
        })
        if (response.ok) {
            setCommentAction(true)
            commentRef.current.value = "";
        }
    }

    function toggleDelete() {
        toggleDeleteModal ? setToggleDeleteModal(false) : setToggleDeleteModal(true);
    }

    function toggleComment() {
        commentClass ? setCommentClass("") : setCommentClass("hide-comment");
    }

    useEffect(() => {
        fetch(`http://localhost:3000/leogram/users/post/${post?._id}/comments`, {
            credentials: "include"
        }).then(res => res.json()).then(data => {
            setComments(data);
            setCommentAction(false)
        });
    }, [commentAction])

    return (
        <>
            <div className='post'>
                {toggleDeleteModal && <DeleteModal deletePost={deletePost} />}
                <div className='post-user-profile'>
                    <div>
                        <div
                            className='post-profile-img'>
                            <div
                                className="post-profile-photo"
                                style={photoStyle}>
                            </div>
                        </div>
                        <div
                            className='post-user-details'>
                            <span>{post?.author.username}</span>
                            <span>
                                <ReactTimeAgo
                                    date={convertTime(post?.createdAt)}
                                    locale="en-US"
                                />
                            </span>
                        </div>
                    </div>
                    {user?.user?._id === post?.author?._id &&
                        <div onClick={toggleDelete}>
                            <BiTrash className='post-menu' />
                        </div>}
                </div>
                <div className='post-text'>
                    <p>
                        {post?.content}
                    </p>
                </div>
                {post?.image &&
                    verifyFileType(post?.image) === "image" &&
                    <div className='post-image'>
                        <img
                            src={`http://localhost:3000/${post?.image}`}
                            alt='post-image'
                        />
                    </div>}
                {post?.image &&
                    verifyFileType(post?.image) === "video" &&
                    <div className='post-image'>
                        <video
                            src={`http://localhost:3000/${post?.image}`}
                            alt='post-image'
                            controls
                        />
                    </div>}

                <div className='post-reactions'>
                    <div onClick={likePost}
                        className={isLiked ? "post-icon liked" : "post-icon"}>
                        <FaThumbsUp /> {likesCount} {likesCount < 2 ? "Like" : "Likes"}
                    </div>
                    <div
                        onClick={toggleComment}
                        className='post-icon'>
                        <FaComment />Comment
                    </div>
                    <div
                        className='post-icon'>
                        <FaShare />Share
                    </div>
                </div>
                <div className={commentClass}>
                    <div className="comment">
                        <form onSubmit={uploadComment} className='comment-form'>
                            <textarea ref={commentRef}
                                placeholder={`Comment on ${post?.author.username}'s post...`}
                                className='comment-field'
                                spellCheck={false}
                                required
                            />
                            <button className='post-comment-btn'>Post</button>
                        </form>
                    </div>
                    {comments && comments?.map(comment =>
                        <Comment key={comment?._id} comment={comment} setCommentAction={setCommentAction} />)}
                </div>
            </div>
        </>
    )
}

export default Post