import React,{useEffect,useState} from "react";
import Cookies from 'universal-cookie';
// import { decodeToken } from "../../utils";
import authContext from "./AuthContext";

const cookie = new Cookies(); // instantiates cookie object 




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
    }

    const login = (token,masterPassword)=>{
        // sets token to generated jwt token and also sets master password to encrypted master password 
        setToken(token);
        setMasterPassword(masterPassword);
        setIsAuthenticated(true);
        // setUser(decodeToken(token));
    }

    // const decodeToken = (token)=>{
    //     // returns decoded token which contains payload specified when logged in
    //     /* {
    //         email,
    //         userName,
    //         authId
    //     } */
    //     return decode(token);
    //     // return jwtDecode(token);
    // }

    useEffect(()=>{
        console.log("HERE")
        const cookieToken = cookie.get('token'); // returns cookie token if exists or returns null
        const cookieMasterPassword = cookie.get('master_password'); // returns hashed master password used as key to encrypt and decrypt passwords

        if((!token||!masterPassword) && (cookieToken && cookieMasterPassword)){
            // triggered if cookie token or cookie master password exist but token or master password does not exist
            login(cookieToken,cookieMasterPassword);
        }

        if((token&&masterPassword) && (token===cookieToken && masterPassword===cookieMasterPassword)){
            // triggered if token and master password exist and match cookie values meaning user is logged in
            login(token,masterPassword);
        }

        if((!token&&!masterPassword) && (!cookieToken && !cookieMasterPassword)){
            // on initial render (on mount) 
            logout();
        }

        if((!token||!masterPassword) && (!cookieToken||!cookieMasterPassword)){
            // if cookie token or cookie master password does not exist and cookie does not exist
            logout();
        }
        




    },[token,masterPassword]); // runs on initial render(initial mount) and every update 

    return (
        <authContext.Provider value={{token,masterPassword,isAuthenticated,user,login,logout}}> 
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;