import { useContext } from 'react';
import './App.css'

import { CiMicrophoneOn } from "react-icons/ci";
import UserContext, { dataContext } from './context/UserContext';

function App() {
  let {recognition,speaking,setSpeaking,setRgText,rgtext,response,setResponse} = useContext(dataContext)

  
  return (
    <>
    
   
    <div className="main">
     <img src='./public/ai.png' id='nihu'/> 
     <span>
    I am Nihu, Your Advanced Virtual Assistant
     </span>
     {!speaking ? 
     <button onClick={()=>{
      setRgText("listening...")
      setSpeaking(true)
      setResponse(false)
      recognition.start()
     }}>Click Here<CiMicrophoneOn /></button>
    :
    <div className='response'>
      {!response ?<img src='./public/speak.gif' id='speak'/>
      :
      <img src='./public/aiVoice.gif' id='gif'/> }
      
      <p>{rgtext}</p>
      </div>
    }
     
     </div>
    </>
  )
}

export default App
