import React, { useContext, useState } from 'react'
import "./Comment.css"
import ProfilePic from "../../assets/images/leogram-test-image.jpg"
import { BiHeart, BiReply, BiTrash } from 'react-icons/bi'
import ReactTimeAgo from 'react-time-ago'
import convertTime from '../../utils/timeConvert'
import { UserContext } from '../../utils/UserContext'
import { setImageLink } from '../../utils/imageHandler'

const Comment = ({ comment, setCommentAction }) => {
    const { setCurrentNotification, setNotifClass } = useContext(UserContext);
    const user = useContext(UserContext);

    const photoStyle = {
        backgroundImage: `url(http://localhost:3000/uploads/${setImageLink(comment?.author?.image)})`
    }

    async function deleteComment() {
        const response = await fetch("http://localhost:3000/leogram/users/post/comment/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ commentId: comment?._id, parentId: comment?.parent_id }),
            credentials: "include"
        })
        const data = await response.json();
        if (response.status) {
            if (data.message) {
                setCurrentNotification(data.message);
                setNotifClass("notification");
                setCommentAction(true);
            }
        }
    }
    return (
        <>
            <div className='comment'>
                <div className='comment-list'>
                    <div className='comment-author-img' style={photoStyle}>
                        <div></div>
                    </div>
                    <div className='comment-user-wrapper'>
                        <span className='comment-author'>
                            @{comment.author.username}
                        </span>
                        <p className='comment-text'>
                            {comment.content}
                        </p>
                        <div className='comment-reaction-wrapper'>
                            {user?.user?.username === comment?.author?.username && <div className='delete-comment'>
                                <span onClick={deleteComment}><BiTrash /></span>
                            </div>}
                            <div className='comment-time'>
                                <span><ReactTimeAgo
                                    date={convertTime(comment?.createdAt)}
                                    locale="en-US"
                                /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment