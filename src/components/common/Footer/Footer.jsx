import React,{useState,useEffect,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGithub,faFacebook,faInstagram,faYoutube,faLinkedin } from "@fortawesome/free-brands-svg-icons";
import './Footer.css'


const Footer = (props)=>{

    const ClickButton = ()=>{

    }

    return (
        <footer id="footer-container">
            <div id="footer-inner-container">
                <div id="social-container">
                    <p>*Monthly Pricing is billed annually</p>

                    <p>Follow us on:</p>
                    <div id="social-icon-container">
                        <FontAwesomeIcon className="social-icon" icon={faGithub} size="2x"/>
                        <FontAwesomeIcon className="social-icon" icon={faFacebook} size="2x"/>
                        <FontAwesomeIcon className="social-icon" icon={faInstagram} size="2x"/>
                        <FontAwesomeIcon className="social-icon" icon={faYoutube} size="2x"/>
                        <FontAwesomeIcon className="social-icon" icon={faLinkedin} size="2x"/>
                    </div>
                </div>
                <hr />

                <div id="footer-dropdown-container">
                    <div className="footer-dropdown">
                        <div id="footer-dropdown-title-container">
                            <div id="footer-title">
                                <h4>Lastpass</h4>
                            </div>

                            <div id="dropdown-icon">
                                <FontAwesomeIcon icon={faPlus} size="1x" />
                            </div>
                        </div>

                        <div id="footer-links">
                            <a href="#" className="footer-link">Homepage</a>
                            <a href="#" className="footer-link">Download</a>
                            <a href="#" className="footer-link">Pricing</a>
                            <a href="#" className="footer-link">How it works</a>
                            <a href="#" className="footer-link">Families</a>
                            <a href="#" className="footer-link">Premium vs Free</a>
                        </div>
                    </div>

                    <hr />

                    <div className="footer-dropdown">
                        <div id="footer-dropdown-title-container">
                            <div id="footer-title">
                                <h4>Features</h4>
                            </div>

                            <div id="dropdown-icon">
                                <FontAwesomeIcon icon={faPlus} size="1x"/>
                            </div>
                        </div>

                        <div id="footer-links">
                            <a href="#" className="footer-link">Homepage</a>
                            <a href="#" className="footer-link">Download</a>
                            <a href="#" className="footer-link">Pricing</a>
                            <a href="#" className="footer-link">How it works</a>
                            <a href="#" className="footer-link">Families</a>
                            <a href="#" className="footer-link">Premium vs Free</a>
                        </div>
                    </div>

                    <hr />

                    <div className="footer-dropdown">
                        <div id="footer-dropdown-title-container">
                            <div id="footer-title">
                                <h4>For Business</h4>
                            </div>

                            <div id="dropdown-icon">
                                <FontAwesomeIcon icon={faPlus} size="1x"/>
                            </div>
                        </div>

                        <div id="footer-links">
                            <a href="#" className="footer-link">Homepage</a>
                            <a href="#" className="footer-link">Download</a>
                            <a href="#" className="footer-link">Pricing</a>
                            <a href="#" className="footer-link">How it works</a>
                            <a href="#" className="footer-link">Families</a>
                            <a href="#" className="footer-link">Premium vs Free</a>
                        </div>
                    </div>

                    <hr />

                    <div className="footer-dropdown">
                        <div id="footer-dropdown-title-container">
                            <div id="footer-title">
                                <h4>Resources</h4>
                            </div>

                            <div id="dropdown-icon">
                                <FontAwesomeIcon icon={faPlus} size="1x"/>
                            </div>
                        </div>

                        <div id="footer-links">
                            <a href="#" className="footer-link">Homepage</a>
                            <a href="#" className="footer-link">Download</a>
                            <a href="#" className="footer-link">Pricing</a>
                            <a href="#" className="footer-link">How it works</a>
                            <a href="#" className="footer-link">Families</a>
                            <a href="#" className="footer-link">Premium vs Free</a>
                        </div>
                    </div>

                </div>

                <div id="copyright-container">
                    <p>&copy; Password Manager. All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer;