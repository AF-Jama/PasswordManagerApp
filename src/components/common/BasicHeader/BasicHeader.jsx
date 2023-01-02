import React,{useState,useEffect,useContext} from "react";
import './BasicHeader.css';


const BasicHeader = (props)=>{



    return (
        <header id="header-outer-container">
            <div id="inner-header-container">
                <div id="title-container">
                    <h5><a href="#">Password Manager</a></h5>
                </div>
            </div>
        </header>
    )
}


export default BasicHeader;