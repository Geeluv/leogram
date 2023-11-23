import React from 'react'
import { FaArrowCircleDown, FaBlogger, FaDropbox, FaExchangeAlt, FaShoppingCart, FaUser, FaUserFriends } from "react-icons/fa"
import { BiDoorOpen, BiGroup } from "react-icons/bi"
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

const sidebarList = [
    {
        id: "username",
        name: "CarlXY",
        icon: function () {
            return <FaUser />
        }
    },
    {
        id: "feedpost",
        name: "Feed",
        icon: function () {
            return <FaDropbox />
        }
    },
    {
        id: "findfriends",
        name: "Find friends",
        icon: function () {
            return <BiGroup />
        }
    },
    {
        id: "chatroom",
        name: "Chat Rooms",
        roomlist: ["forex city", "blockchain city", "airdrop city", "bull market city", "bear market city"],
        icon: function () {
            return <BiDoorOpen />
        }
    },
    {
        id: "chatfriend",
        name: "Chat with friend",
        icon: function () {
            return <FaUserFriends />
        }
    },
    // {
    //     id: "nft",
    //     name: "NFT MarketPlace",
    //     icon: function () {
    //         return <FaShoppingCart />
    //     }
    // },
    // {
    //     id: "swap",
    //     name: "Swap",
    //     icon: function () {
    //         return <FaExchangeAlt />
    //     }
    // },
    {
        id: "blog",
        name: "Blog",
        icon: function () {
            return <FaBlogger />
        }
    },
    {
        id: "seemore",
        name: "See more",
        icon: function () {
            return <FaArrowCircleDown />
        }
    }
]

const Sidebar = ({ isActive, setIsActive, setDisplayPage, fullview }) => {

    function setActiveClass(index, id) {
        if (id === "username") {

            setDisplayPage("")
        }
        setIsActive(index);
        setDisplayPage(id);
    }

    return (
        <>
            <ul className='sidebar'>
                {sidebarList.map((list, index) => (
                    <NavLink
                        to={fullview.includes(list.id) ? `/${list.id}` : ""}
                        key={list.id}
                        onClick={() => setActiveClass(index, list.id)}
                        className={isActive === index ? "sidebar-list active-sidebar" : "sidebar-list"}>
                        {list.icon()} {list.name}
                    </NavLink>
                ))}
            </ul >
        </>
    )
}

export default Sidebar