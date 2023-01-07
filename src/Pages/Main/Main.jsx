import React,{useState,useEffect,useContext} from "react";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrash,faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Header from '../../components/common/Header';
import Card from "../../components/Card";
import useAuth from "../../customHooks/auth";
import './Main.css';


const Main = (props)=>{
    const { token,masterPassword,isAuthenticated,user,login,logout } = useAuth();

    if(!isAuthenticated){
        // triggered if user is not authenticated 
        return <Navigate to='/login' replace={true}/>
    }

    return (
        <div id="main-passwords-container">
            <Header/>

            <main id="main-container">
                <div id="actions-container">
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="delete-btn" icon={faTrash} color="black"/>
                    </div>
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="add-btn" icon={faPlus} color="black"/>
                    </div>
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="edit-btn" icon={faPenToSquare} color="black"/>
                    </div>
                </div>
                <div id="passwords-container">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </main>
        </div>
    )
}



export default Main;