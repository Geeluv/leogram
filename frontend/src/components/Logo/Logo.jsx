import "./Logo.css"
import LogoImg from "../../assets/images/leo-chat.png";

const Logo = () => {
    return (
        <>
            <div className="logo">
                <img src={LogoImg} alt="logo" />
            </div>
        </>
    )
}

export default Logo