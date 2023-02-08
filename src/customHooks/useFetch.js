import React,{useEffect,useState} from "react";


const useFetch = (URL)=>{
    const [data,setData] = useState(null); // sets data state 
    const [loading,setLoading] = useState(true); // sets loading state 
    const [error,setError] = useState(false); // sets error state 
    const [refetchIndex, setRefetchIndex] = useState(0); // sets refetch state 

    const refetch = ()=> setRefetchIndex((prevFetchIndex)=>prevFetchIndex+1); // method which increments state of refetchIndex

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let response = await fetch(URL);
                if(!response.ok) throw Error;
                response = await response.json();

                setData(response);
                setLoading(false);
                setError(false);
            }catch(error){
                setData(null)
                setLoading(true);
                setError(true);
            }
        }
        fetchData();
    },[URL,refetchIndex]) // runs on initial render (initial mount) and changes to dependency array 

    return {data,loading,error,refetch}; // returns data,loading,error state
}


export default useFetch;