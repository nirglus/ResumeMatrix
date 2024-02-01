import { db } from "../../config/firebaseConfig"
import { useState, useContext, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/User"
import DisplayCard from "../DisplayCard";
import "./Display.css";

function Display() {
  const {user, submitedResume, setSubmitedResume} = useContext(UserContext);
  const [userResumes, setUserResumes] = useState([]);

  const getResumes = async (currentUser) => {
    const q = query(collection(db, "resumes"), where("userID", "==", currentUser));

    try {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        const newResumes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setUserResumes(newResumes);
        setSubmitedResume(false);
        console.log({ userResumes });
    } catch (error) {
        console.error("Can not fetch to the db: ", error);
    }
};
  useEffect(() =>{
    console.log('User is activated in display', {user});
    if(user && user.id){
      getResumes(user.id);
    }
 
  },[user, submitedResume])


  return (
    <div className="resumesDisplay">
      {userResumes.map((resume, index) =>{
        return (
          <div className="singleResumeDisp" key={index}>
            <DisplayCard resumeData={resume}/>
            <Link className="download" to={`/resumes/${resume.id}`}>View Resume <i class="bi bi-binoculars"></i></Link>
          </div>
        )
      })}
    </div>
  )
}

export default Display
