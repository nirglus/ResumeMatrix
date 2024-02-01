import { useContext, useState } from "react"
import { auth } from "../../config/firebaseConfig"
import { db } from "../../config/firebaseConfig"
import { setDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import Login from "../../components/Login"
import SignUp from "../../components/SignUp"
import { UserContext } from "../../context/User"
import "./Auth.css";

function Auth() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({});
    const {user, setUser} = useContext(UserContext);
    
    const handleToggle = () =>{
        setIsLoginMode(!isLoginMode);
    }
    const changeHandler = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const addUserToDB = async (user) =>{
        try{
            const newUserRef = doc(db, "users", user.uid);
            await setDoc(newUserRef, {email: user.email, id: user.uid, nickname: formData.nickname});
            console.log("User added to the db successfully!");
        } catch(error){
            console.error("Error adding document: ", error);
        }
    };

    const submitHandler = async(e) =>{
        e.preventDefault();
        try{
            let userCard;
            if(isLoginMode) {
                userCard = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                console.log("Logged in successfully");
            } else {
                userCard = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                console.log("Registered successfully");
                await addUserToDB(userCard.user);
            }
            setUser(userCard.user);
             window.location.href = '/';
             } catch (error) {
              console.error("Error: ", error.message);
             }
        }
     
     return (
        <div className="authCont">
            {
                isLoginMode ?
                    <Login submitHandler={submitHandler} changeHandler={changeHandler} />
                    :
                    <SignUp submitHandler={submitHandler} changeHandler={changeHandler} />
            }
            <p className="toggleLog" onClick={handleToggle} >
                {isLoginMode ? "Don't have an account? Register" : "Have an account? Login"}
            </p>
        </div>
    )
}

export default Auth
