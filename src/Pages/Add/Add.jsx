import React,{useState,useEffect,useContext} from "react";
import { Navigate,useNavigate } from "react-router";
import Header from "../../components/common/Header";
import AddForm from "../../components/AddForm";
import useAuth from "../../customHooks/auth";
import './Add.css';


const Add = (props)=>{
    const { token,masterPassword,isAuthenticated,user,login,logout } = useAuth();

    if(isAuthenticated){
        return (
            <div id="add-container">
                <Header/>
    
                <div id="main-add-container">
                    <div className="add-card">
                        <h4>Add password to your vault</h4>
                        <AddForm/>
                        <a href="/passwords">Go to my passwords</a>
                    </div>
                </div>
            </div>
        )
    }
    
    return <p>NOT LOGGED IN</p>

    
}


export default Add;