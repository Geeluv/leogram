import React, { useContext, useRef, useState } from 'react';
import { BiImage, BiSmile } from 'react-icons/bi';
import { UserContext } from '../../utils/UserContext';
import EmojiPicker from 'emoji-picker-react';
import "./Post.css"

const PostForm = ({ uploadPost, postContent, setPostContent, setPostImage, postImage, emojiPicker, setEmojiPicker }) => {
    const user = useContext(UserContext);
    const textRef = useRef();

    function toggleEmojiPicker() {
        emojiPicker ? setEmojiPicker(false) : setEmojiPicker(true);
    }

    function handleEmoji(data, event) {
        let cursorPosition = textRef.current.selectionStart;
        let textValue = textRef.current.value;
        setPostContent(textValue.slice(0, cursorPosition) + data.emoji + textValue.slice(cursorPosition));
    }

    return (
        <>
            <div className='post-form-wrapper'>
                <form onSubmit={uploadPost} className='feed-post-form'>
                    <textarea
                        ref={textRef}
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        className='feed-post-form-input'
                        type='text'
                        placeholder={`Hey, ${user?.user?.username}! What do you want to post on Leogram today...?`}
                        spellCheck={false}
                        maxLength={2500}
                        required>
                    </textarea>
                    <span className='post-length'>{postContent.length}/2500 words</span>
                    <div className='post-attachments'>
                        <label
                            className='add-to-post'
                            htmlFor="post-img-upload"
                        >
                            <BiImage /> {
                                postImage?.length > 0 ? `${postImage?.length} image added` : "Add image"
                            }
                        </label>
                        <input
                            name="postimage"
                            id='post-img-upload'
                            onChange={e => setPostImage(e.target.files)}
                            type='file'
                            style={{ display: "none" }}
                        />
                        <span onClick={toggleEmojiPicker} className='add-to-post'>
                            <BiSmile /> Add smiley
                        </span>
                    </div>
                    {emojiPicker && <div className='emoji'><EmojiPicker onEmojiClick={handleEmoji} /></div>}
                    <button className='postfeed-btn'>Post</button>
                </form>
            </div>
        </>
    )
}

export default PostForm