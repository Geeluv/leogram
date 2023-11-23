import React from 'react'
import "./DeleteModal.css"

const DeleteModal = ({ deletePost }) => {

    return (
        <>
            <div className='toggle-delete-modal'>
                <button onClick={deletePost} className='confirm-del-btn'>Confirm delete?</button>
            </div>
        </>
    )
}

export default DeleteModal