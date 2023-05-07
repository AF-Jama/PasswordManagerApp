import React,{useState,useEffect,useContext} from "react";
import { Navigate } from "react-router";
import Header from "../../components/common/Header";
import RegisterForm from "../../components/RegisterForm";
import passwordImage from '../../assets/passwordLock.jpg';
import useAuth from "../../customHooks/auth";
import './Signup.css';


const SignUp = ()=>{
    const { masterPassword,isAuthenticated,user,login,logout } = useAuth();

    if(isAuthenticated){
        return <Navigate to='/passwords' replace={true}/>
    }

    return (
        <div id="sign-up-container">
            <Header/>
            <main id="main-outer-container">
                <div id="main-inner-container">
                    <div id="col-1">
                        <div id="register-text-container">
                            <h2>Create an account</h2>
                        </div>
                        <div id="register-form-container">
                            <RegisterForm/>
                        </div>
                    </div>

                    {/* <div id="img-container">
                        <img id="sign-up-page-image" src={passwordImage} alt="Password Signup Image" />
                    </div> */}
                    <p className="login-text"><a href="/login">Already have an account? <br/> Login here</a></p>
                </div>
            </main>
        </div>
    )
}


export default SignUp;