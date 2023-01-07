import React,{useState,useEffect,useContext} from "react";
import { Navigate } from "react-router";
import Header from "../../components/common/Header";
import LoginForm from "../../components/LoginForm";
import useAuth from "../../customHooks/auth";
import './Login.css';


const Login = (props)=>{
    const { token,masterPassword,isAuthenticated,user,login,logout } = useAuth();

    console.log(`Token is ${token}`);
    console.log(`Master password is ${masterPassword}`);

    if(isAuthenticated){
        // triggered if user is authenticated 
        return <Navigate to='/passwords' replace={true}/>
    }


    return (
        <div id="logout-container">
            <Header/>

            <main id="main-outer-container">
                <div id="main-inner-container" style={{display:"block"}}>
                    <div id="welcome-container">
                        <h2>Login</h2>
                    </div>
                    <div id="login-form-container">
                        <LoginForm/>
                    </div>
                </div>
            </main>
        </div>
    )
}



export default Login;