import { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { NavLink} from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const { userSignOut, currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    };

  const closeMenu = () => {
      setIsOpen(false); 
    };
  
  return (
      <nav>
        <div className="logo">
          <img className="logoImage" src={logo} alt="ResumeMatrix-Logo" />
          <h1>
            Resume<span className="matrix">Matrix</span>
          </h1>
        </div>
        <div className={`myNavItems ${isOpen ? "active" : ""}`}>
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <ul>
            <li>
              <NavLink exact to="/" onClick={closeMenu}> 
                <i className="bi bi-house"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/resume" onClick={closeMenu}>
                <i className="bi bi-file-earmark-person"></i> Resume
              </NavLink>
            </li>
            {currentUser ? (
              <>
                <li>
                  <NavLink to={`/account/${currentUser.id}`} onClick={closeMenu}>
                    <i className="bi bi-list-stars"></i> My Resumes
                  </NavLink>
                </li>
                <li>
                  <button onClick={userSignOut}>
                    <i className="bi bi-box-arrow-right"></i> Sign out,{" "}
                    <span>
                      {" "}
                      <b>{currentUser.nickname}</b>
                    </span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" onClick={closeMenu}>
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;
