import React, { useState } from "react";
import NavBar from "../NavBar";
import RegisterForm from "../../RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import './Header.css';

const Header = (props)=>{
    const [visibility,setVisibility] = useState(false); // set visibility state

    return (
        <header id="header-container">
            <div id="inner-header-container">
                <div id="logo-containe">
                    <a href=""><h4>Password Manager</h4></a>
                </div>

                <NavBar visibility={visibility}/>

                <div id="b-btn-container" className={visibility?"change":"ontainer"} onClick={()=>setVisibility(!visibility)}>
                    <div id="bar" className="bar1"></div>
                    <div id="bar" className="bar2"></div>
                    <div id="bar" className="bar3"></div>
                </div>

            </div>

        </header>
    )
}

export default Header;