import React,{useState} from "react";
import pageContext from "./PageContext";


const PageContextProvider = ({children})=>{
    const [page,setPage] = useState(1); // sets page state



    return (
        <pageContext.Provider value={{page,setPage}}>
            {children}
        </pageContext.Provider>
    )
}


export default PageContextProvider;