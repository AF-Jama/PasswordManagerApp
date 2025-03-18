import React,{useContext} from "react";
import pageContext from "../contexts/PageContext/PageContext";

const usePage = ()=>{
    // use page custom hook, returns context provider values
    return useContext(pageContext);
}


export default usePage;