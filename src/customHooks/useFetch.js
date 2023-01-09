import React,{useEffect,useState} from "react";


const useFetch = (URL)=>{
    const [data,setData] = useState(null); // sets data state 
    const [loading,setLoading] = useState(true); // sets loading state 
    const [error,setError] = useState(null); // sets error state 

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let response = await fetch(URL);
                if(!response.ok) throw Error;
                response = await response.json();

                setData(response);
                setLoading(false);
                setError(null);
            }catch(error){
                setData(null)
                setLoading(true);
                setError(error);
            }
        }
        fetchData();
    },[URL]) // runs on initial render (initial mount) and changes to dependency array 

    return {data,loading,error}; // returns data,loading,error state
}


export default useFetch;