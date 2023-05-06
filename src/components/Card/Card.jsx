import React,{useState,useEffect,useContext} from "react";
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash,faEye } from "@fortawesome/free-solid-svg-icons";
import encPasswordLock from '../../assets/enc-lock.svg';
import binImage from '../../assets/del.svg';
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

    const onImageError = (e)=>{
        e.target.src = "https://img.freepik.com/premium-vector/modern-flat-design-unknown-format-file-icon-web-simple-style_599062-542.jpg?w=200"
    }

    const decrypt = (encryptedPassword)=>{
        // triggered when revealStatus is set to true
        let decrypted = CryptoJS.AES.decrypt(encryptedPassword,masterPassword).toString(CryptoJS.enc.Utf8);

        return decrypted; // returns decrypted value 
    }

    console.log(revealStatus);

    return (
        <div id="password-card" className={props.delStatus?"card-shake":""} key={props.uniqueKey}>
            <img id="site-img" src={`https://logo.clearbit.com/${props.siteName}.com?size=200`} onError={onImageError} style={{width:"50px",height:"50px"}} alt="" />
            
            <div id="password-details-container">
                <h4>{props.siteName}</h4>

                <p id="password-encrypted-string">{props.encPassword.substring(0,8) + "..."}</p>     
            </div>

            <img className="action-img" id="lock" src={encPasswordLock} alt="" />
            {props.delMethod?<img id="bin-img" src={binImage} alt="" />:""}
        </div>
    )
}



export default Card;