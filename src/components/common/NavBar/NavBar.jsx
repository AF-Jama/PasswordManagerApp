import React,{useState,useEffect,useContext, createRef, useRef} from "react";
import useAuth from "../../../customHooks/auth";
import ActionButton from "../ActionButton";
import RegisterForm from "../../RegisterForm";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faDisplay,faXmark } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props)=>{
    const [visibility,setVisibility] = useState(false); // visible state is initial set to false 
    const {token,masterPassword,isAuthenticated,login,logout} = useAuth(); // use Auth hook which runs on initial mount and subsequent changes to the useEffect dependency array

    const burgerRef = useRef();
    const navLinksOuterContainer = useRef();

    // const onClick = ()=>{
    //     console.log("CLICKED!!!")
    // }

    const onButtonClick = (event)=>{
        event.preventDefault();
        if(!visibility){
            // triggered if nav links are visible 
            navLinksOuterContainer.current.style.maxHeight="500px";
            setVisibility(!visibility);
            return;

        }
        navLinksOuterContainer.current.style.maxHeight="0px";
        setVisibility(!visibility);
        return;
    }


    return (
        <nav id="nav-bar-container">
            <div id="nav-links-container" ref={navLinksOuterContainer}>
                <a href="#" className="nav-links">Home</a>
                <a href="#" className="nav-links">About</a>
                <a href="#" className="nav-links">Your Passwords</a>
                {token?<a href="#"><ActionButton text="Logout" style={{padding:"0.5rem 2.5rem",width:"100px"}}/></a>:<a href="/login"><ActionButton text="Login" style={{padding:"0.5rem 2.5rem",width:"100px"}}/></a>}
            </div>

            {/* <div id="action-button-container">
            </div> */}

            <div id="burger-btn-container" ref={burgerRef}>
                {visibility?<FontAwesomeIcon icon={faXmark} color="black" style={{height:"30px",width:"30px"}} onClick={onButtonClick}/>:<FontAwesomeIcon icon={faBars} color="black" style={{height:"30px",width:"30px"}} onClick={onButtonClick} />}
            </div>
        </nav>
    )
}

export default NavBar;