import React from "react";
import NavBar from "../NavBar";
import RegisterForm from "../../RegisterForm";
import './Header.css';

const Header = (props)=>{

    return (
        <div id="header-outer-container">
            <header id="header-container">
                <div id="logo-container">
                    <h5><a href="#">Password Manager</a></h5>
                </div>

                <NavBar/>

            </header>
        </div>
    )
}

export default Header;