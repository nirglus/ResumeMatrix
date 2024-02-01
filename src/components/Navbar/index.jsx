import { useContext } from "react"
import { UserContext } from "../../context/User"
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const {userSignOut, currentUser} = useContext(UserContext);
  return (
    <nav>
        <div className="logo">
            <img className="logoImage" src={logo} alt="ResumeMatrix-Logo" />
            <h1>Resume<span className="matrix">Matrix</span></h1>
        </div>
        <div className="navItems">
            <Link to="/">Home</Link>
            <Link to="/resume">Resume</Link>            
            {currentUser ? 
            (<button onClick={userSignOut}>Sign out,<span> <b>{currentUser.nickname}</b></span></button>)
             : (<Link to ="/login">Login</Link>)
             }
        </div>
    </nav>
  )
}

export default Navbar
