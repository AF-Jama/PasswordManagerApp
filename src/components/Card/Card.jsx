import { eventWrapper } from "@testing-library/user-event/dist/utils";
import React,{useState,useEffect,useContext} from "react";
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
            <h3>{props.siteName}</h3>

            <div id="password-details-container">
                <p>{props.password}</p>
                {revealStatus?<ActionButton style={{display:"block",width:"100%"}} text = "Hide" onClick={onClick}/>:<ActionButton text="Show" onClick={onClick}/>}
            </div>
        </div>
    )
}



export default Card;