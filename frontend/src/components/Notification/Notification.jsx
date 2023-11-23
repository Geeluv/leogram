import React, { useContext } from 'react'
import { UserContext } from '../../utils/UserContext'
import "./Notification.css"

const Notification = () => {
    const { currentNotification, setNotifClass, notifClass } = useContext(UserContext);

    function hideNotification() {
        setNotifClass("hide-notif");
    }
    return (
        <>
            <div className={notifClass}>
                {currentNotification}
                <div onClick={hideNotification} className='close-notif'>x</div>
            </div>
        </>
    )
}

export default Notification