import React,{useState,useEffect,useContext} from "react";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrash,faPenToSquare,faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Header from '../../components/common/Header';
import Card from "../../components/Card";
import useAuth from "../../customHooks/auth";
import useFetch from "../../customHooks/useFetch";
import './Main.css';


const Main = (props)=>{
    const { token,masterPassword,isAuthenticated,user,login,logout } = useAuth();
    const [limit,setLimit] = useState(4); // sets endpoint limit 
    const [endpoint,setEndpoint] = useState(`/passwords/getPasswords?limit=${limit}`);
    const { data,loading,error } = useFetch(endpoint);

    const createCards = (data)=>{
        // takes data and creates card 
        let a = [1,2,3,4,5,6,7,8];

        let cards = [];

        data.results.forEach((value,index,array)=>{
            cards.push(<Card siteName={value.siteName} encPassword={value.encPassword}/>)
        })

        console.log(cards);

        return cards; // returns cards 
    }

    if(!isAuthenticated){
        // triggered if user is not authenticated 
        return <Navigate to='/login' replace={true}/>
    }

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
                    {(loading||error) && <h4 id="loading-title">Loading...</h4>}
                    {data && createCards(data)}
                </div>

                <div id="arrow-action-container">
                    <div id="arrow-left-container">
                        <FontAwesomeIcon icon={faArrowLeft} color="black"/>
                    </div>
                    <div id="arrow-right-container">
                        <FontAwesomeIcon icon={faArrowRight} color="black"/>
                    </div>
                </div>
            </main>
        </div>
    )
}



export default Main;