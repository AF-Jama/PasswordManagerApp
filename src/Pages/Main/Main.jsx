import React,{useState,useEffect,useContext} from "react";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrash,faPenToSquare,faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Header from '../../components/common/Header';
import Card from "../../components/Card";
import useAuth from "../../customHooks/auth";
import useFetch from "../../customHooks/useFetch";
import useSize from "../../customHooks/useSize";
import './Main.css';


const Main = (props)=>{
    const { masterPassword,isAuthenticated,user,login,logout } = useAuth();
    const size = useSize(); // useSize custom hook which returns window width on mount
    const [page,setPage] = useState(1); // sets endpoint limit 
    const [limit,setLimit] = useState(4);
    // const limit = useSize();
    const [endpoint,setEndpoint] = useState(`/passwords/getPasswords?page=${page}&limit=${limit}`); // sets endpoint state 
    const { data,loading,error } = useFetch(endpoint);

    const createCards = (data)=>{
        // takes data and creates card 
        let a = [1,2,3,4,5,6,7,8];

        let cards = [];

        data.results.forEach((value,index,array)=>{
            cards.push(<Card siteName={value.siteName} encPassword={value.encPassword} uniqueKey={index}/>)
        })

        console.log(cards);

        return cards; // returns cards 
    }

    console.log(isAuthenticated);
    // console.log(size?.width);

    if(!isAuthenticated){
        // triggered if user is not authenticated 
        return <Navigate to='/login' replace={true}/>
    }

    console.log(endpoint);

    return (
        <div id="main-passwords-container">
            <Header/>

            <main id="main-container">
                <div id="actions-container">
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="delete-btn" icon={faTrash} color="black"/>
                    </div>
                    <div className="password-action-btns">
                        <a href="/passwords/add"><FontAwesomeIcon id="add-btn" icon={faPlus} color="black"/></a>
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
                        <FontAwesomeIcon id="left-arrow-icon" className={(page===1)?"disabled-left-arrow":""}  icon={faArrowLeft} color="black" onClick={()=>{
                            setEndpoint(data.prev);
                            setPage(page-1);
                        }}/>
                    </div>
                    <p>Page {page}</p>
                    <div id="arrow-right-container">
                        <FontAwesomeIcon id="right-arrow-icon" icon={faArrowRight} className={(!data?.next)?"disabled-right-arrow":""} color="black" onClick={()=>{
                            setEndpoint(data.next)
                            setPage(page+1)
                        }}/>
                    </div>
                </div>
            </main>
        </div>
    )
}



export default Main;