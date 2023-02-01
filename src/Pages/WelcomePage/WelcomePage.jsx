import React,{useState,useEffect,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faFile,faFingerprint,faDesktop,faShare,faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/common/Header";
import FreeCard,{PremiumCard,FamilyCard} from "../../components/PricingCard";
import useAuth from "../../customHooks/auth";
import ActionButton from "../../components/common/ActionButton";
import './WelcomePage.css';


const WelcomePage = ()=>{
    const { isAuthenticated,user } = useAuth();



    return (
        <div id="welcome-page-container">
            <Header/>

            <main id="main-welcome-page">
                <div id="explanation-div">
                    <div id="inner-explanation-container">
                        <div id="welcome-text-container">
                            <h1>Password Management from Anywhere</h1>

                            <p>Life is happening online. Work. Play. Family and friends.<br/> 
                                LastPass puts your digital life at your fingertips,
                                 simply and securely.
                            </p>


                        </div>

                        <div id="btns-container">
                            <ActionButton text="Personal"/>
                            <ActionButton text="Business"/>
                        </div>
                    </div>

                </div>

                <div id="pros-container">
                    <div id="pros-inner-container">
                        <div id="heading-container">
                            <h2>Auto Pilot for all your passwords</h2>
                            <p>LastPass removes obstacles letting you get back to the things you love most</p>
                        </div>

                        <div id="card-container">
                            <div id="lock-card" className="card">
                                <div className="icon-container">
                                    <FontAwesomeIcon icon={faLock} size="3x"/>
                                </div>
                                <h2>Log in and Go</h2>
                                <p>Once you save a password in LastPass, you'll always have it when you need it; logging in is fast and easy.</p>
                            </div>

                            <div id="fingerPrint-card" className="card">
                                <div className="icon-container">
                                    <FontAwesomeIcon icon={faFingerprint} size="3x"/>
                                </div>
                                <h2>Passwordless Login</h2>
                                <p>Gain instant access to your LastPass vault by using the LastPass Authenticator instead of your master password.</p>
                            </div>

                            <div id="strong-passwords-card" className="card">
                                <div className="icon-container">
                                    <FontAwesomeIcon icon={faRotateRight} size="3x"/>
                                </div>
                                <h2>Generate Strong Passwords</h2>
                                <p>The built-in password generator creates long, randomized passwords that protect against hacking.</p>
                            </div>

                            <div id="hacking-card" className="card">
                                <div className="icon-container">
                                    <FontAwesomeIcon icon={faDesktop} size="3x"/>
                                </div>
                                <h2>Dark web monitoring</h2>
                                <p>Once you save a password in LastPass, you'll always have it when you need it; logging in is fast and easy.</p>
                            </div>

                            <div id="store-record-card" className="card">
                                <div className="icon-container">
                                    <FontAwesomeIcon icon={faFile} size="3x"/>
                                </div>
                                <h2>Store Digital Records</h2>
                                <p>Once you save a password in LastPass, you'll always have it when you need it; logging in is fast and easy.</p>
                            </div>

                            <div id="share-password-card" className="card">
                                <div className="icon-container">
                                    <FontAwesomeIcon icon={faShare} size="3x"/>
                                </div>
                                <h2>Share Effortlessly</h2>
                                <p>Some things shouldn't be sent in a text. Conveniently and safely share passwords and notes with anyone.</p>
                            </div>

                        </div>
                    </div>
                </div>       


                <div id="pricing-container">
                    <div id="inner-pricing-container">
                        <h2>Pricing</h2>

                        <div id="pricing-card-container">
                            <FreeCard/> 
                            <PremiumCard/>
                            <FamilyCard/>
                        </div>
                    </div>

                </div>         
            </main>

            
        </div>
    )
}



export default WelcomePage;