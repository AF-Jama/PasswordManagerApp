import React,{useState,useEffect,useContext, createRef, useRef} from "react";
import useAuth from "../../../customHooks/auth";
import ActionButton from "../ActionButton";
// import RegisterForm from "../../RegisterForm";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faDisplay } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props)=>{
    const [visible,setVisibility] = useState(true); // visible state is initial set to true 
    const {token,masterPassword,isAuthenticated,login,logout} = useAuth(); // use Auth hook which runs on initial mount and subsequent changes to the useEffect dependency array

    const burgerRef = useRef();
    const navLinksOuterContainer = useRef();

    const onClick = ()=>{
        console.log("CLICKED!!!")
    }

    const onBurgerButtonClick = (event)=>{
        event.preventDefault();
        if(visible){
            // triggered if nav links are visible 
            setVisibility(false);
            // navLinksOuterContainer.current.style.display='none';
            navLinksOuterContainer.current.style.transform ="translateY(-1000px)";
            // navLinksOuterContainer.current.style.display="none";
            return;

        }
        setVisibility(true);
        // navLinksOuterContainer.current.style.display='block';
        navLinksOuterContainer.current.style.transform ="translateY(0px)";
        // navLinksOuterContainer.current.style.display="block";
        return;
    }


    return (
        <nav id="nav-bar-container">
            <div id="nav-links-container" ref={navLinksOuterContainer}>
                <a href="#" className="nav-links">Home</a>
                <a href="#" className="nav-links">About</a>
                <a href="#" className="nav-links">Your Passwords</a>
                {token?<ActionButton text="Logout" onClick={onClick}/>:<ActionButton text="Login" onClick={onClick}/>}
            </div>

            {/* <div id="action-button-container">
            </div> */}

            <div id="burger-btn-container" ref={burgerRef}>
                <FontAwesomeIcon icon={faBars} onClick={onBurgerButtonClick} color="white" style={{height:"30px",width:"30px"}} />
            </div>
        </nav>
    )
}

export default NavBar;