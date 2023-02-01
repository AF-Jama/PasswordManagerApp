import React,{useState,useEffect,useContext} from "react";
import './PricingCard.css';
import './PremiumCard.css';


const PremiumCard = (props)=>{



    return (
        <div id="premium-pricing-card" className="pricing-card">
            <div className="section1">
                <div className="pricing-container">
                    <div className="pricing-type">
                        <h3>Premium</h3>
                    </div>
                    <div className="pricing-amount-container">
                        <h3 id="price-amount">£2<span id="price-cent-amount">.60</span></h3>
                    </div>
                </div>

                <div className="btn-container">
                    {/* <ActionButton text="Get Started for free"/> */}
                    <button className="get-started-btn">Start 30-day Free Trail</button>
                </div>
                {/* <span id="premium-span">Includes 30 day trail of Premium</span> */}
                <h3>Buy Premium</h3>
            </div>

        <hr />

        <div className="section-2">
            <div id="section-2-inner-container">
                <p className="features">Unlimited Passwords</p>
                <p className="features">Access on one device type – computer or mobile</p>
                <p className="features">Save and autofill passwords</p>
                <p className="features">One-to-one sharing </p>
                <p className="features">Passwordless login</p>
                <p className="features">Password generator</p>
            </div>
        </div>
    </div>
    )
}


export default PremiumCard;