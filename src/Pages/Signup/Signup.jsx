import React,{useState,useEffect,useContext} from "react";
import Header from "../../components/common/Header";
import RegisterForm from "../../components/RegisterForm";
import passwordImage from '../../assets/passwordLock.jpg';
import './Signup.css';


const SignUp = ()=>{



    return (
        <div id="sign-up-container">
            <Header/>
            <main id="main-outer-container">
                <div id="main-inner-container">
                    <div id="register-form-container">
                        <RegisterForm/>
                    </div>
                    <div id="img-container">
                        <img id="sign-up-page-image" src={passwordImage} alt="Password Signup Image" />
                    </div>
                </div>
            </main>
        </div>
    )
}


export default SignUp;