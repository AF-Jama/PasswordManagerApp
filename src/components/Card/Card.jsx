import React,{useState,useEffect,useContext} from "react";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../common/ActionButton";
import useAuth from "../../customHooks/auth";
import './Card.css';


const Card = (props)=>{
    const [revealStatus,setRevealStatus] = useState(false); // sets reveal status
    const [del,setDeleteStatus] = useState(false); 
    const { masterPassword } = useAuth();

    const onClick = (event)=>{
        // triggered on click
        event.preventDefault();

        setRevealStatus(!revealStatus); // sets reveal status 
    }

    const decrypt = (encryptedPassword)=>{
        // triggered when revealStatus is set to true
        let decrypted = CryptoJS.AES.decrypt(encryptedPassword,masterPassword).toString(CryptoJS.enc.Utf8);

        return decrypted; // returns decrypted value 
    }

    console.log(revealStatus);

    return (
        <div id="card" className={props.delStatus?"card-shake":""} key={props.uniqueKey}>
            {/* <h3>{props.siteName}</h3> */}
            <h4>{props.siteName}</h4>
            <p>{props.uniqueKey}</p>

            <div id="password-details-container">
                {/* <p>{props.password}</p> */}
                <p>{revealStatus?`${decrypt(props.encPassword)}`:`${props.encPassword.substring(0,10)}...`}</p>
            </div>
                {revealStatus?<button id="enc-dec-btn" className="reveal-btn" style={{padding:"0.5rem 3.6rem"}} onClick={onClick}><FontAwesomeIcon icon={faEye} color="black"/></button>:<button id="enc-dec-btn" className="reveal-btn" style={{padding:"0.5rem 3.6rem"}} onClick={onClick}><FontAwesomeIcon icon={faEyeSlash} color="black"/></button>}
                {props.delStatus?<p onClick={()=>props.delMethod(props.uniqueKey)}>Delete</p>:''}
        </div>
    )
}



export default Card;