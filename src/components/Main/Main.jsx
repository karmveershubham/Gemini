import React, { useContext } from "react";
import './Main.css'
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
const Main=()=>{
//importing isDarkMode and toggleTheme
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input,isDarkMode, toggleTheme}=useContext(Context)

    const onChangeInput=(e)=>{
        setInput(e.target.value);
    }

    return (
        <div className={`main ${isDarkMode ? 'dark-mode' : 'light-mode'}`} >
            <div className="nav">
                <p class={isDarkMode?'gem' :null }>Gemini</p>
                <div className="nav-controls">
                    {/* Added theme toggle button */}
                    <button onClick={toggleTheme}>
                        {isDarkMode ? <img src={assets.light_mode}/> :  <img src={assets.dark_mode}/>}
                    </button>
                    <img src={assets.user_icon} alt="" />
                </div>
            </div>
            <div className="main-container">
                {!showResult ? 
                <>
                    <div className="greet">
                        <p><span>Hello, SHUBH</span></p>
                        <p>How I can Help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggets Beautiful Places to see on an upcoming road Trip</p>
                            <img src={assets.compass_icon} alt=""/>
                        </div>
                        <div className="card">
                            <p>Briefly Summarize this conecpt:Urban Planning</p>
                            <img src={assets.bulb_icon} alt=""/>
                        </div>
                        <div className="card">
                            <p>Brainstorm team bondding activities for our work retreat</p>
                            <img src={assets.message_icon} alt=""/>
                        </div>
                        <div className="card">
                            <p>Improve the readbility of the following code.</p>
                            <img src={assets.code_icon} alt=""/>
                        </div>
                    </div>
                </>
                : <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt=""/>
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt =""/>
                        {loading?<div className='loader'>
                            <hr/>
                            <hr/>
                            <hr/>
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
                }
                
                 <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={onChangeInput} value={input} type="text" placeholder="Enter a prompt Here."/>
                        <div>
                            <img src={assets.gallery_icon} alt=""></img>
                            <img src={assets.mic_icon} alt=""></img>
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt=""></img>:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double check its  responses. Your privacy and Gemini Apps.
                    </p>
                 </div>
            </div>
        </div>
    )
}

export default Main;