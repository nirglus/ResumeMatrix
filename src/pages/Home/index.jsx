import "./Home.css";
import { UserContext } from "../../context/User";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const {user} = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  
  return (
    <div className="homeTop">
        <h1>Crafting the <span className="matrix">perfect</span> resume is now <span className="matrix">easier</span> than ever!</h1>
        <ul>
          <li>Impressive resumes, Effortless rafting</li>
          <li>Real-time preview & Pre-written examples</li>
          <li>Dozens of HR approved templates</li>
          <li>Create your winning resume in just 15 minutes</li>
        </ul>
        {user? (
        <Link className="download" to="/resume">Create a resume!</Link>) : (<Link className="download" to="/login">Try it out!</Link>)}
      </div>
  )
}

export default Home
