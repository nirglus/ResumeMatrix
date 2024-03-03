import { db } from "../../config/firebaseConfig"
import { useState, useContext, useEffect } from "react"
import { collection, doc, deleteDoc, getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/User"
import DisplayCard from "../DisplayCard";
import "./Display.css";

function Display() {
  const {user, submitedResume, setSubmitedResume} = useContext(UserContext);
  const [userResumes, setUserResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        console.log({ userResumes });
    } catch (error) {
        console.error("Can not fetch to the db: ", error);
    }

  };
  
  const removeResume = async(resumeID) =>{
    console.log({resumeID});
    try {
      await deleteDoc(doc(db, "resumes", resumeID));
      console.log(`Resume ${resumeID} has been deleted`);
      setUserResumes(userResumes.filter((resume) => resume.id !== resumeID));
    } catch (error) {
      console.error("Could not delete resume: ", error);
    }
  }
  
  useEffect(() =>{
    console.log('User is activated in display', {user});
    if(user && user.id){
      getResumes(user.id);
    }
 
  },[user, submitedResume])

  return(
    <div className="display">
    {isLoading ? (
        <div className="loading">
            <img src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif" alt="loading" />
        </div>
    ) : userResumes.length > 0 ? (
        <div className="resumesDisplay" >
        {userResumes.map((resume, index) =>{
          return (
            <div className="singleResumeDisp" key={resume.id}>
              <DisplayCard resumeData={resume}/>
              <div className="resumeBtns">
                <Link className="download" to={`/resumes/${resume.id}`}>View Resume <i class="bi bi-binoculars"></i></Link>
                <button onClick={() => removeResume(resume.id)}><i class="bi bi-trash3"></i></button>
              </div>
            </div>
          )
        })}
        </div> 
    ) : (
        <div className="noResumeDisp">
            <h1>No resumes to display yet!</h1>
        </div>
    )}
</div>
  )
}

export default Display
