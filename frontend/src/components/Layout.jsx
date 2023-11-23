import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Notification from './Notification/Notification'

const Layout = () => {
    return (
        <>
            <Navbar />
            <Notification />
            <Outlet />
        </>
    )
}

export default Layout