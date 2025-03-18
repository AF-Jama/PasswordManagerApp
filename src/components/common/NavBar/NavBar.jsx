import React,{useState,useEffect,useContext, createRef, useRef} from "react";
import useAuth from "../../../customHooks/auth";
import ActionButton from "../ActionButton";
import RegisterForm from "../../RegisterForm";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faDisplay,faXmark } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({visibility})=>{
    const {token,masterPassword,isAuthenticated,logout} = useAuth(); // use Auth hook which runs on initial mount and subsequent changes to the useEffect dependency array

    return (
        <nav id="nav-bar-container" className={visibility?"full":"hides"}>
            <div id="nav-links-container">
                <a href="#" className="nav-links">Home</a>
                <a href="#" className="nav-links">About</a>
                <a href="/passwords" className="nav-links">Your Passwords</a>
            </div>

                {
                    
                isAuthenticated
                
                ?
                <div id="action-btns-container">
                    <div className="action-btn">
                        <a href="#" id="logout"><ActionButton text="Logout" onClick={logout} style={{padding:"0.5rem 2.5rem",width:"100px"}}/></a>
                    </div>
                </div>
                
                :
                <div id="action-btns-container">
                    <div className="action-btn">
                        <a href="/login" id="login"><ActionButton text="Login"/></a>
                    </div>

                    <div className="action-btn">
                        <a href="/signup" id="signout"><ActionButton text="Signup"/></a>
                    </div>
                </div>
                
                }
        </nav>
    )
}

export default NavBar;