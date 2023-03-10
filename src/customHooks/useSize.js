import React,{useState,useEffect,useContext} from "react";


const useSize = ()=>{
    const [size,setSize] = useState(null); // sets viewport size width state 
    const [limit,setLimit] = useState(4) // sets limit state 

    useEffect(()=>{
        // Handler to call on window resize
        function handleResize() {
            // Sets window width to state 
            // setSize(window.innerWidth);

            if(window.innerWidth>500){
                // triggered if width is greater than 500
                setLimit(8);
                return;
            }
            setLimit(4);
            return;
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }); // runs on initial render(on mount)

    return limit; // returns size state which represent window width 
}


export default useSize;