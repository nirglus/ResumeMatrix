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
            <Link to="/"><i class="bi bi-house"></i> Home</Link>
            <Link to="/resume"><i class="bi bi-file-earmark-person"></i> Resume</Link>            
            {currentUser ? 
            (<button onClick={userSignOut}><i class="bi bi-box-arrow-right"></i> Sign out,<span> <b>{currentUser.nickname}</b></span></button>)
             : (<Link to ="/login"><i class="bi bi-box-arrow-in-right"></i> Login</Link>)
             }
        </div>
    </nav>
  )
}

export default Navbar
