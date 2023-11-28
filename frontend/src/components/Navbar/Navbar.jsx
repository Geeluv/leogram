import "./Navbar.css"
import Logo from "../Logo/Logo"
import { NavLink, useNavigate } from "react-router-dom";
import { BiMenu, BiUser } from "react-icons/bi"
import { useContext, useState } from "react";
import { UserContext } from "../../utils/UserContext";

const Navbar = () => {
    const [navClass, setNavClass] = useState("nav-list");
    const [dropdown, setDropdown] = useState(false);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    function toggleMenu() {
        if (dropdown === false) {
            setDropdown(true);
            setNavClass("nav-list dropdown");
        } else {
            setDropdown(false);
            setNavClass("nav-list");
        }
    }

    function clickHandler() {
        setNavClass("nav-list");
        setDropdown(false)
    }

    async function logout() {
        const response = await fetch("http://localhost:3000/leogram/users/logout", { credentials: "include" });
        if (response.ok) {
            localStorage.removeItem("leogram-user-profile");
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
                        <NavLink to="/feed" onClick={clickHandler} className="nav-link">Home</NavLink>
                        <NavLink to="/feed" onBlur={clickHandler} className="nav-link">Feed</NavLink>
                        <NavLink to="/profile" onBlur={clickHandler} className="nav-link">Profile</NavLink>
                        <NavLink onClick={logout} className="nav-link">Logout</NavLink>
                        {user?.user?.username && <NavLink className="nav-link nav-user"><BiUser /> Hello, {user?.user?.username}</NavLink>}
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