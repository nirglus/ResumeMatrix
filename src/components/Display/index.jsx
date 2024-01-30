import { db } from "../../config/firebaseConfig"
import { useState, useContext, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { UserContext } from "../../context/User"
import DisplayCard from "../DisplayCard";

function Display() {
  const {user} = useContext(UserContext);
  const [userResumes, setUserResumes] = useState([]);

  const getResumes = async (currentUser) =>{
    const q = query(collection(db, "resumes"), where("userID", "==" , currentUser));

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) =>{
        console.log(doc.id, "=>", doc.data());
        setUserResumes([...userResumes , doc.data()]);
      })
      console.log(userResumes);

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
      {userResumes.map((resume, index) =>{
        return <DisplayCard resumeData={resume} key={index}/>
      })}
    </div>
  )
}

export default Display
