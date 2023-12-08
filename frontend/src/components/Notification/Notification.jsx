import React, { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import "./Notification.css"
import { AiOutlineCloseCircle } from "react-icons/ai"

const Notification = () => {
    const { currentNotification, setNotifClass, notifClass } = useContext(UserContext);

    function hideNotification() {
        setNotifClass("hide-notif");
    }
    return (
        <>
            <div className={notifClass}>
                <section className='notif-wrapper'>
                    {currentNotification}
                    <div onClick={hideNotification}>
                        <AiOutlineCloseCircle className='close-notif' />
                    </div>
                </section>
            </div>
        </>
    )
}

export default Notification