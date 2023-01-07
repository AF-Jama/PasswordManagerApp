import React,{useState,useEffect,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../common/ActionButton";
import './Card.css';


const Card = (props)=>{
    const [revealStatus,setRevealStatus] = useState(false); // sets reveal status 

    const onClick = (event)=>{
        // triggered on click
        event.preventDefault();

        setRevealStatus(!revealStatus); // sets reveal status 
    }

    console.log(revealStatus);

    return (
        <div className="card">
            {/* <h3>{props.siteName}</h3> */}
            <h4>Site Name</h4>

            <div id="password-details-container">
                {/* <p>{props.password}</p> */}
                <p>Password 1</p>
                {revealStatus?<button className="reveal-btn" style={{padding:"0.5rem 3.6rem"}} onClick={onClick}><FontAwesomeIcon icon={faEye} color="black"/></button>:<button className="reveal-btn" style={{padding:"0.5rem 3.6rem"}} onClick={onClick}><FontAwesomeIcon icon={faEyeSlash} color="black"/></button>}
            </div>
        </div>
    )
}



export default Card;