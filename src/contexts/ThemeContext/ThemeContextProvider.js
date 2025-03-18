import React,{useState} from "react";
import themeContext from "./ThemeContext";


const ThemeContextProvider = ({children})=>{
    const [theme,setTheme] = useState(null); // initial state of theme of null which represents light theme

    const changeTheme = ()=>{
        // change theme method
        if(!theme){
            // triggered if theme is null which represents light theme, which triggers theme change to dark theme
            setTheme(1);
            return;
        }
        setTheme(null);
        return;
    }

    return (
        <themeContext.Provider value={changeTheme}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeContextProvider;