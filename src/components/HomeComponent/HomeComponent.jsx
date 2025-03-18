import React,{useState,useEffect,useContext} from "react";
import './HomeComponent.css';
import { redirect } from "react-router";


const HomeComponent = (props)=>{
    // const {user,isAuthenticated,isLoading,loginWithRedirect,logout} = useAuth0();

    // if(isLoading){
    //     return (
    //         <div>Loading..</div>
    //     )
    // }

    // if(!isAuthenticated){
    //     return (
    //         <div id="outer-container">
    //             <div>Not Authenticated</div>
    //             <button onClick={()=>loginWithRedirect()} >Login</button>
    //         </div>
    //     )
    // }


    return (
        <div id="outer-container">
            Home Component
        </div>
    )
}

export default HomeComponent;