import { useContext } from "react"
import { UserContext } from "../../context/User"
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const {user, userSignOut, currentUser} = useContext(UserContext);
  return (
    <nav>
        <div className="logo">
            {/* <img src={logo} alt="ResumeMatrix-Logo" /> */}
            <h1>ResumeMatrix</h1>
        </div>
        <div className="navItems">
            <Link to="/" style={{padding: "8px"}}>Home</Link>
            <Link to="/resume" style={{padding: "8px"}}>Resume</Link>            
            {currentUser ? 
            (<button onClick={userSignOut}>Sign out, {currentUser.nickname}</button>)
             : (<Link to ="/login" style={{padding: "8px"}}>Login</Link>)
             }
        </div>
    </nav>
  )
}

export default Navbar
