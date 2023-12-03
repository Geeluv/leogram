import "./Navbar.css"
import Logo from "../Logo/Logo"
import { NavLink, useNavigate } from "react-router-dom";
import { BiMenu, BiUserCircle } from "react-icons/bi"
import { useContext, useState } from "react";
import { UserContext } from "../../utils/UserContext";

const Navbar = () => {
    const [navClass, setNavClass] = useState("nav-list");
    const user = useContext(UserContext);
    const navigate = useNavigate();

    function toggleMenu() {
        navClass === "nav-list" ?
            setNavClass("nav-list dropdown") :
            setNavClass("nav-list");
    }

    function clickHandler() {
        setNavClass("nav-list");
    }

    async function logout() {
        const response = await fetch("http://localhost:3000/leogram/users/logout", { credentials: "include" });
        if (response.ok) {
            localStorage.removeItem("leogram-user-profile");
            user.setUser(null);
            navigate("/")
        }
    }

    return (
        <>
            <nav className="nav-wrapper">
                <div className="navbar">
                    <div className="nav-logo">
                        <Logo />
                        <h1>LeoGram</h1>
                    </div>
                    <ul className={navClass}>
                        <NavLink to="/feed" onClick={clickHandler} className="nav-link">Feed</NavLink>
                        <NavLink to={/profile/ + user?.user?._id} onClick={clickHandler} className="nav-link">Profile</NavLink>
                        <NavLink onClick={logout} className="nav-link">Logout</NavLink>
                        {user?.user?.username && <NavLink className="nav-user nav-link"><BiUserCircle /> {user?.user?.username}</NavLink>}
                    </ul>
                    <button onClick={toggleMenu} className="menu-btn">
                        <BiMenu />
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar