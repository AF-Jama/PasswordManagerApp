import React,{useState,useEffect,useContext} from "react";
import './ActionButton.css';


const ActionButton = (props)=>{



    return (
        <button id="action-btn" className="btn btn-primary" onClick={props.onClick} style={props.style}>{props.text}</button>
    )
}

export default ActionButton;