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

    const delayPara=(index, nextWord)=>{

    }

    function formatText(text) {
        text = text.replace(/## (.+)/g, '<h2>$1</h2>');
        text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        text = text.replace(/\* (.+)/g, '<li>$1</li>');
        text = text.replace(/(<li>.+<\/li>)/g, '<ul>$1</ul>');
        return text;
    }

    const  onSent = async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        let response = await run(input);
        let newResponse=formatText(response.text());
        setResultData(newResponse);
        setLoading(false);
        setInput("");
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

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
