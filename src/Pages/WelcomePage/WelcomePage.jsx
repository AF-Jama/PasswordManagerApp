import React,{useState,useEffect,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock,faFile,faFingerprint,faDesktop,faShare,faRotateRight } from "@fortawesome/free-solid-svg-icons";
import person1 from '../../assets/person1.jpg';
import person2 from '../../assets/person2.jpg';
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
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
                <div id="inner-main-welcome-page">
                    <div id="hero">
                        <div className="hero-text-container">
                            <div className="hero-text">
                                <p style={{fontWeight:"bolder",marginTop:"1rem"}}>Your Partner in secure password storage</p>
                            </div>
                            <div className="hero-sub-text">
                                <p>Password Manager that protects the privacy and safety of your personal data</p>
                            </div>

                            <div className="hero-action-btn-container">
                                <div className="hero-action-btn">
                                    <button>Business</button>
                                </div>

                                <div className="hero-action-btn">
                                    <button>Personal</button>
                                </div>
                            </div>

                            <div className="review-section">
                                <div className="review-container">
                                    <p>"This the greatest password manager of all time, I reccomend this 100%"</p>
                                    <p>One of our customer</p>
                                </div>
                            </div>

                        </div>
                        <div className="hero-image-container"></div>
                    </div>
                </div>
            </main>

            <Footer/>

            
        </div>
    )
}



export default WelcomePage;