import React from "react";
import NavBar from "../NavBar";
import RegisterForm from "../../RegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import './Header.css';

const Header = (props)=>{

    return (
        <header id="header-container">
            <div id="inner-header-container">
                <div id="logo-container">
                    <h4><a href="#">Password Manager</a></h4>
                </div>

                <NavBar/>
            </div>

        </header>
    )
}

export default Header;