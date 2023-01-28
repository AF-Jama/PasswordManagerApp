import React,{useState,useEffect,useContext} from "react";
import Header from "../../components/common/Header";
import useAuth from "../../customHooks/auth";
import './WelcomePage.css';


const WelcomePage = ()=>{
    const { isAuthenticated,user } = useAuth();



    return (
        <div id="welcome-page-container">
            <Header/>

            <main id="main-welcome-page">
                <div id="explanation-div">
                    <div id="inner-explanation-container">
                        <h3>Welcome to Password Manager</h3>

                        <p>Reasons to use Password Manager</p>

                        <ul>
                            <li>Safe</li>
                            <li>No Knowledge based encyption</li>
                            <li>Free</li>
                        </ul>

                    </div>
                </div>
            </main>

            
        </div>
    )
}



export default WelcomePage;