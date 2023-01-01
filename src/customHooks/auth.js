import React,{useEffect,useState,useContext} from "react";
import authContext from "../contexts/AuthContext/AuthContext.js";

const useAuth = ()=>{
    // returns context 
    return useContext(authContext);  // returns auth context which returns provider values
}


export default useAuth; 