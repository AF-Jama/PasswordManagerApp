import React,{useState,useEffect,useContext} from "react";
import Header from "../../components/common/Header";
import AddForm from "../../components/AddForm";
import './Add.css';


const Add = ()=>{



    return (
        <div id="add-container">
            <Header/>

            <div id="main-add-container">
                <AddForm/>
            </div>
        </div>
    )
}


export default Add;