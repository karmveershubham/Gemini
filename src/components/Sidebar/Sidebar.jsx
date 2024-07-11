import React, { useContext, useState } from "react";
import './Sidebar.css';
import {assets} from  '../../assets/assets'
import { Context } from "../../context/Context";

const Sidebar = ()=>{
    const [extended, setExtended]=useState(true);
    const {onSent, prevPrompts,setRecentPrompt, newChat}=useContext(Context);
    const { isDarkMode } = useContext(Context);
    
    const loadPrompt= async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
    const collapse=()=>{
        setExtended(prev=>!prev);
    }

    return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`} id={isDarkMode?'darkside':null}>
        <div className="top">
            {/* added collapse function */}
            <img onClick = {collapse} className="menu"  src={assets.menu_icon} alt=""/>  
            <div onClick={()=>newChat()}className="new-chat">
                <img src={assets.plus_icon} alt =""/>
                {extended?<p>New Chat</p> : null}
            </div>
            {extended  
                ?<div className="recent">
                    <p className="recent-title">Recent</p>
                    {prevPrompts.map((item,index)=>{
                        return (
                            <div onClick={()=>loadPrompt(item)}className="recent-entry">
                                <img src={assets.message_icon} alt=""/>
                                <p className="recent-entry-text">{item.slice(0,18)}...</p>
                            </div>
                        )
                    })}
                    
                </div>
            : null}
           
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry " >
                <img src={assets.question_icon} alt=""/>
                {extended ? <p> Help </p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt=""/>
                {extended ? <p>Activity</p> :null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt=""/>
                {extended ? <p>Settings</p> :null}
            </div>
        </div>
    </div>
    )
}

export default Sidebar;
