import { useContext, useState } from "react"
import { UserContext } from "../../context/User"
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const {userSignOut, currentUser} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () =>{
    setIsOpen(!isOpen);
  }
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav>
        <div className="logo">
            <img className="logoImage" src={logo} alt="ResumeMatrix-Logo" />
            <h1>Resume<span className="matrix">Matrix</span></h1>
        </div>
        <div className={`navItems ${isOpen ? 'active' : ''}`}>
            <div className="hamburger" onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <ul>
              <li><Link to="/" onClick={closeMobileMenu}><i class="bi bi-house"></i> Home</Link></li>
              <li><Link to="/resume" onClick={closeMobileMenu}><i class="bi bi-file-earmark-person"></i> Resume</Link></li>                  
              {currentUser ? 
              (<li><button onClick={userSignOut}><i class="bi bi-box-arrow-right"></i> Sign out,<span> <b>{currentUser.nickname}</b></span></button></li>)
              : (<li><Link to ="/login"><i class="bi bi-box-arrow-in-right"></i> Login</Link></li>)
              }
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
