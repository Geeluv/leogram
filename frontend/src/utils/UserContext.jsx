import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currentNotification, setCurrentNotification] = useState("");
    const [reMount, setReMount] = useState("");
    const [notifClass, setNotifClass] = useState("hide-notif");
    const [user, setUser] = useState(() => {
        const userProfile = localStorage.getItem("leogram-user-profile");
        if (userProfile) {
            return JSON.parse(userProfile);
        }
        return null;
    });

    useEffect(() => {
        async function getUserProfile() {
            const response = await fetch("http://localhost:3000/leogram/users/user", {
                credentials: "include"
            });
            const userData = await response.json();
            if (userData) {
                localStorage.setItem("leogram-user-profile", JSON.stringify(userData) || "");
                setUser(userData);
                return;
            }
            if (!response.ok) {
                localStorage.setItem("leogram-user-profile", "");
                setUser("");
            }
            navigate("/");
        }
        getUserProfile();
    }, [user?.username, reMount]);

    return <UserContext.Provider value={{
        user,
        setUser,
        currentNotification,
        setCurrentNotification,
        notifClass, setNotifClass,
        reMount, setReMount
    }}>
        {children}
    </UserContext.Provider>
}