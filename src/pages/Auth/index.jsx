import { useContext, useState, useEffect } from "react";
import { auth } from "../../config/firebaseConfig";
import { db } from "../../config/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import { UserContext } from "../../context/User";
import "./Auth.css";

function Auth() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "", nickname: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const handleToggle = () => {
        setIsLoginMode(!isLoginMode);
        setHasError(false); 
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addUserToDB = async (user) => {
        try {
            const newUserRef = doc(db, "users", user.uid);
            await setDoc(newUserRef, { email: user.email, id: user.uid, nickname: formData.nickname });
            console.log("User added to the db successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setHasError(false); 

        if (!formData.email || !formData.password || (!isLoginMode && !formData.nickname)) {
            setHasError(true); 
            setIsLoading(false);
            return;
        }

        try {
            let userCard;
            if (isLoginMode) {
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
            setHasError(true); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="authCont">
            {isLoading && 
                <div className="loading">
                    <img src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif" alt="loading" />
                </div>
            }
            {isLoginMode ? 
                <Login submitHandler={submitHandler} changeHandler={changeHandler} hasError={hasError} /> 
                : 
                <SignUp submitHandler={submitHandler} changeHandler={changeHandler} hasError={hasError} />
            }
            <p className={hasError ? 'error' : 'toggleLog'} onClick={handleToggle}>
                {!hasError ? 
                    (isLoginMode ? "Don't have an account? Register" : "Have an account? Login") :
                    "Incorrect email or password"
                }
            </p>
        </div>
    );
}

export default Auth;
