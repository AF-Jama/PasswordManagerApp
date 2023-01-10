import React,{useState,useEffect,useContext} from "react";
import { Navigate,useNavigate } from "react-router";
import Header from "../../components/common/Header";
import AddForm from "../../components/AddForm";
import useAuth from "../../customHooks/auth";
import './Add.css';


const Add = (props)=>{
    const { token,masterPassword,isAuthenticated,user,login,logout } = useAuth();

    if(isAuthenticated){
        // triggered if block evaluates to true
        return (
            <div id="add-container">
                <Header/>
    
                <div id="main-add-container">
                    <AddForm/>
                </div>
            </div>
        )

    }

    return <Navigate to='/login'/>

    
}


export default Add;