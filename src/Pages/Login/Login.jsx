import React,{useState,useEffect,useContext} from "react";
import Header from "../../components/common/Header";
import LoginForm from "../../components/LoginForm";
import './Login.css';


const Login = (props)=>{



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