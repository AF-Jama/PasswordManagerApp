import React,{useEffect,useState} from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
// import { decodeToken } from "../../utils";
import authContext from "./AuthContext";

const AuthContextProvider = ({children})=>{
    // state which will be passed down children components as context provider values
    const [token,setToken] = useState(null); // initial state of login context provider is null, a logged in user represents a existing jwt in a user request cookie. 
    const [masterPassword,setMasterPassword] = useState(null) // initial state of encrypted master password is null 
    const [isAuthenticated,setIsAuthenticated] = useState(false); // authentication state which is bool value
    const [user,setUser] = useState(null); // user state

    const logout = ()=>{ 
        // logout method sets token and master password to null
        setToken(null);
        setMasterPassword(null);
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('master_password');
    }

    // const login = (token,masterPassword)=>{
    //     // sets token to generated jwt token and also sets master password to encrypted master password 
    //     setToken(token);
    //     setMasterPassword(masterPassword);
    //     setIsAuthenticated(true);
    //     setUser(decodeToken(token));
    // }

    const decodeToken = (token)=>{
        // returns decoded token which contains payload specified when logged in
        /* {
            email,
            userName,
            authId
        } */
        return jwtDecode(token); // return jwtDecode(token);
    }

    useEffect(()=>{
        console.log("HERE")
        const cookieMasterPassword = Cookies.get('master_password'); // returns hashed master password used as key to encrypt and decrypt passwords
        console.log(cookieMasterPassword);

        if((!masterPassword) && (cookieMasterPassword)){
            // triggered if cookie token or cookie master password exist but token or master password does not exist
            setMasterPassword(cookieMasterPassword);
            setIsAuthenticated(true);
        }

        if((masterPassword) && (masterPassword===cookieMasterPassword)){
            // triggered if token and master password exist and match cookie values meaning user is logged in
            console.log("USER TOKEN AND MASTER PASSWORD EXIST")
        }

        if((!masterPassword) && (!cookieMasterPassword)){
            // on initial render (on mount) 
            console.log("INITIAL MOUNT");
        }

        if((masterPassword) && (masterPassword!==cookieMasterPassword)){
            // triggered if master password exists and master password does not cookie master password 
            logout();
        }


    },[masterPassword]); // runs on initial render(initial mount) and every update 

    return (
        <authContext.Provider value={{masterPassword,isAuthenticated,user,logout}}> 
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;