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
                        <div id="add-card-title">
                            <h4>Add Password</h4>
                            <p>Enter Password</p>
                        </div>
                        <AddForm/>
                        <hr />
                        <a href="/passwords">Go to my passwords</a>
                    </div>
                </div>
            </div>
        )
    }
    
    return <p>NOT LOGGED IN</p>

    
}


export default Add;