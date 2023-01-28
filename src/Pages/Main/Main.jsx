import React,{useState,useEffect,useContext} from "react";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrash,faPenToSquare,faArrowRight,faArrowLeft,faStop } from "@fortawesome/free-solid-svg-icons";
import Header from '../../components/common/Header';
import Card from "../../components/Card";
import useAuth from "../../customHooks/auth";
import useFetch from "../../customHooks/useFetch";
import useSize from "../../customHooks/useSize";
import { generateRandomString } from "../../utils";
import './Main.css';
import { set } from "react-hook-form";


const Main = (props)=>{
    const { masterPassword,isAuthenticated,user,login,logout } = useAuth();
    const size = useSize(); // useSize custom hook which returns window width on mount
    const [next,setNext] = useState('');
    const [prev,setPrev] = useState('');
    const [page,setPage] = useState(1); // sets endpoint limit 
    const [limit,setLimit] = useState(4);
    const [del,setDelStatus] = useState(false); // sets delete status of child cards
    // const limit = useSize();
    const [endpoint,setEndpoint] = useState(`/passwords/getPasswords?page=${page}&limit=${limit}`); // sets endpoint state 
    const { data,loading,error,refetch } = useFetch(endpoint);

    const createCards = (data)=>{
        // takes data and creates card 
        let a = [1,2,3,4,5,6,7,8];

        let cards = [];

        data.results.forEach((value,index,array)=>{
            // console.log(value.id)
            cards.push(<Card siteName={value.siteName} encPassword={value.encPassword} uniqueKey={value.id} delStatus={del} delMethod = {deleteCard}/>)
        })

        // console.log(cards);

        return cards; // returns cards 
    }

    const deleteCard = (passwordKey)=>{
        // delete card logic
        // fetch(`/passwords/deletePassword/${passwordKey}`,{
        //     method:"DELETE"
        // }).then(res=>console.log("Clicked"))
        fetch(`/passwords/deletePassword/${passwordKey}`,{
            method:"DELETE"
        }).then(res=>refetch()) // on succesful return of resolved promise fetch method is called which causes change in state of refetchIndex
        // .then((res)=>console.log("Clicked")) // delete password based off password key
        // .catch((err)=>console.log("Error"))

    }

    // console.log(isAuthenticated);
    // console.log(size?.width);

    if(!isAuthenticated){
        // triggered if user is not authenticated 
        return <Navigate to='/login' replace={true}/>
    }
    // console.log(endpoint);

    // if(data && data.results.length===0 && page!==1){
    // }

    if((data && data.results.length===0 && data.statusCode===400 && page!==1)){
        console.log("TRIGGERED DATA ON DOES NOT EXIST")
        console.log(`curr page is ${page}`)
        setPage(currPage=>currPage-1);
        setEndpoint(prev)
        console.log(`currl page is ${page}`)
    }

    console.log(page)
    console.log(endpoint)

    return (
        <div id="main-passwords-container">
            <Header/>

            <main id="main-container">
                <div id="actions-container">
                    <div className="password-action-btns">
                        {del?<FontAwesomeIcon id="stop-delete-btn" icon={faStop} color="black" onClick={()=>setDelStatus(false)}/>:<FontAwesomeIcon id="delete-btn" icon={faTrash} color="black" onClick={()=>setDelStatus(true)}/>}
                    </div>
                    <div className="password-action-btns">
                        <a href="/passwords/add"><FontAwesomeIcon id="add-btn" icon={faPlus} color="black"/></a>
                    </div>
                    <div className="password-action-btns">
                        <FontAwesomeIcon id="edit-btn" icon={faPenToSquare} color="black"/>
                    </div>
                </div>

                <div id="passwords-container">
                    {/* {error||loading && <h4 id="loading-title">Loading...</h4>}
                    {data.statusCode===400 && <h4></h4>} */}
                    {(!data && error||loading) && <h4>Loading..</h4>}
                    {(data && data.results.length===0 && page===1) && <h4>No authenticated passwords on your account</h4>}
                    {/* {(data?.results?.length && page!==1) && setPage(page-1)}
                    {(!data?.results?.length && page=== 1) && <h4>No encrypted passwords</h4>}
                    {(data.results)?createCards(data):<h4>No encrypted Password on your account</h4>} */}
                    {(data) && createCards(data)}
                </div>

                <div id="arrow-action-container">
                    <div id="arrow-left-container">
                        <FontAwesomeIcon id="left-arrow-icon" className={(page===1)?"disabled-left-arrow":""}  icon={faArrowLeft} color="black" onClick={()=>{
                            setEndpoint(data.prev);
                            setPage(currPage=>currPage-1);
                        }}/>
                    </div>
                    <p>Page {page}</p>
                    <div id="arrow-right-container">
                        <FontAwesomeIcon id="right-arrow-icon" icon={faArrowRight} className={(!data?.next)?"disabled-right-arrow":""} color="black" onClick={()=>{
                            setPrev(endpoint) // sets prev state to current endpoint before endpoint state is changed to data.next
                            setNext(data.next)
                            setPage(currPage=>currPage+1)
                            setEndpoint(data.next)
                        }}/>
                    </div>
                </div>
            </main>
        </div>
    )
}



export default Main;