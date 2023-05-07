import React,{useState,useEffect,useContext,useReducer} from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import CryptoJS from "crypto-js";
import encPasswordLock from '../../assets/enc-lock.svg';
import decPasswordLock from '../../assets/dec-lock.svg';
import leftArrow from '../../assets/left-arrow.svg'
import Header from "../../components/common/Header";
import useAuth from "../../customHooks/auth";
import './PasswordPage.css';



const PasswordPage = ({ siteName,encPassword })=>{
    const { token,isAuthenticated,masterPassword } = useAuth();
    const [showState,setShowState] = useState(false);
    const location = useLocation();
    const navigation = useNavigate();


    console.log(location);


    const decrypt = (encryptedPassword)=>{
        // triggered when revealStatus is set to true
        let decrypted = CryptoJS.AES.decrypt(encryptedPassword,masterPassword).toString(CryptoJS.enc.Utf8);
        return decrypted; // returns decrypted value 
    }

    const onImageError = (e)=>{
        e.target.src = "https://img.freepik.com/premium-vector/modern-flat-design-unknown-format-file-icon-web-simple-style_599062-542.jpg?w=200"
    }






    return (
        <div id="password-page-container">
            <main id="password-page-main-container">
                    <h2>{location.state?.siteName}</h2>

                    <img src={location.state?.siteImage} width={100} height={100} onError={onImageError} alt="" style={{margin:"1rem auto",borderRadius:"25px"}} />
                    
                    
                    <div id="password-enc-dec-container">
                        <p>{(showState)?decrypt(location.state?.encPassword):location.state?.encPassword}</p>
                    </div>


            </main>

            {showState?<img className="pass-lock" src={decPasswordLock} alt="" onClick={()=>setShowState(!showState)} />:<img className="pass-lock" src={encPasswordLock} alt="" onClick={()=>setShowState(!showState)} />}
            <img id="left-arrow" onClick={()=>navigation('/passwords')} src={leftArrow} alt="" />

        </div>
    )

}



export default PasswordPage;