import { db } from "../../config/firebaseConfig"
import { useState, useContext, useEffect } from "react"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../../context/User"

function Display() {
  const {currentUser, user} = useContext(UserContext);
  const [userResumes, setUserResumes] = useState([]);
  const [resumeData, setResumeData] = useState();

  const getResumes = async (currentUser) =>{
    const q = query(collection(db, "resumes"), where("userID", "==" , currentUser));

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) =>{
        console.log(doc.id, "=>", doc.data());
        setResumeData(prevData => [...prevData, doc.data()]);
      })
      // console.log(querySnapshot);

    } catch (error) {
      console.error("Can not fetch to the db: ", error);
    }
  }
  useEffect(() =>{
    console.log('User is activated in display', {user});
    if(user && user.id){
      getResumes(user.id);
    }
 
  },[user])

  return (
    <div>
      
    </div>
  )
}

export default Display
