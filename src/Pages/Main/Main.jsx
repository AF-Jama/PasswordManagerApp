import React,{useState,useEffect,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrash,faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Header from '../../components/common/Header';
import './Main.css';


const Main = (props)=>{



    return (
        <div id="main-passwords-container">
            <Header/>

            <main id="main-container">
                <div id="actions-container">
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="delete-btn" icon={faTrash} color="black"/>
                    </div>
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="add-btn" icon={faPlus} color="black"/>
                    </div>
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="edit-btn" icon={faPenToSquare} color="black"/>
                    </div>
                </div>
                <div id="passwords-container">
                    SUCCESFUL
                </div>
            </main>
        </div>
    )
}



export default Main;