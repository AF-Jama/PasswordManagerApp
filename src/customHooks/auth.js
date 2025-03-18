import React,{useEffect,useState,useContext} from "react";
import authContext from "../contexts/AuthContext/AuthContext.js";

const useAuth = ()=>{
    // returns context object and useEffect runs on initial render(on mount) and dependency array change
    return useContext(authContext);  // returns auth context which returns provider values
}


export default useAuth; 