import DisplayCard from "../../components/DisplayCard"
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";

function Single() {
  
  let {id: resumeID} = useParams(); 
  const [resumeData, setResumeData] = useState();
  
  const fetchResume = async() =>{
    const docRef = doc(db, "resumes", resumeID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setResumeData(docSnap.data());
      console.log({resumeData});
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() =>{
    fetchResume();
    console.log({resumeID});
  }, [resumeID])
  return (
    <div>
      {resumeData ? (
        <DisplayCard resumeData={resumeData} />
      ): null}
      {resumeID}
    </div>
  )
}

export default Single
