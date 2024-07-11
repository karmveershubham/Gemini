import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context =createContext();

const ContextProvider = (props)=>{
    const [input ,setInput]=useState("");
    const [recentPrompt, setRecentPrompt]=useState("");
    const [prevPrompts, setPrevPrompts]=useState([]);
    const [showResult, setShowResult]=useState(false);
    const [loading, setLoading]=useState(false);
    const [resultData, setResultData]=useState("");
    // Added state for theme
    const [isDarkMode, setIsDarkMode] = useState(true);

    const delayPara=(index, nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    const newChat =()=>{
        setLoading(false);
        setShowResult(false);
    }

    function formatText(text) {
        text = text.replace(/## (.+)/g, '<h2>$1</h2>');
        text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        text = text.replace(/\* (.+)/g, '<li>$1</li>');
        text = text.replace(/(<li>.+<\/li>)/g, '<ul>$1</ul>');
        return text;
    }

    const onSent = async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPrevPrompts(prev=>[...prev, input]);
            setRecentPrompt(input);
            response= await run(input);
        }
        let newResponse=formatText(response.text());
        // set result data using delaypara function
        let newerResponse=newResponse.split(" ");
        for(let i=0;i<newerResponse.length; i++){
            const nextWord=newerResponse[i];
            delayPara(i, nextWord+" ");
        }
        setLoading(false);
        setInput("");
    }
    // Function to toggle dark mode
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    }

    // onSent("What is React JS");
    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        // Added theme-related values
        isDarkMode,
        toggleTheme
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
