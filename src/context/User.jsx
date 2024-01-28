import { createContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";

export const UserContext = createContext({});

export default function UserProvider({children}){
    const [user, setUser] = useState(null);
    useEffect(() =>{ 
        onAuthStateChanged(auth, (userCardential) =>{
            if (userCardential){
                setUser({ email: userCardential.email, id: userCardential.uid});
                console.log(user);
            }
        })}, [])
    
    const userAuth = getAuth();
    
    const userSignOut = () => {
        signOut(userAuth)
            .then(() => {
              console.log("Signed out");
            })
            .catch((error) => {
              console.error("Error signing out: ", error);
            })
            .finally(() => {
              setUser(null); 
            });
        };
    return(
       <UserContext.Provider value={{user, setUser, userSignOut}}>
        {children}
       </UserContext.Provider>
    )
}