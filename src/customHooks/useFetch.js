import React,{useEffect,useState} from "react";


const useFetch = (URL)=>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

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
    },[]) // runs on initial render (initial mount)

    return {data,loading,error}; // returns data,loading,error state
}