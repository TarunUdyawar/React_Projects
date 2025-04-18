import './App.css';
import chatgpt from '/public/assets/chatgpt.svg'
import add from '/public/assets/add-30.png'
import message from '/public/assets/message.svg'
import home from '/public/assets/home.svg'
import bookmark from '/public/assets/bookmark.svg'
import rocket from '/public/assets/rocket.svg'
import send from '/public/assets/send.svg'
import user from '/public/assets/user-icon.png'
import chatgptLogo from '/public/assets/chatgptLogo.svg'
import { sendMsgtoAi } from './openAI';
import { useEffect, useRef, useState } from 'react';
import { Gi3dGlasses } from "react-icons/gi";
import { FaBars } from "react-icons/fa"; 

function App() {
  const refEnd = useRef()
  const[input,setInput] = useState("");
  const[hamburger,settHamburger] = useState(false)
  const [messages,setMessages] = useState([{

    text:"Hi, I am Tarun AI designed and developed by Tarun Udyawar",
    isBot :true,

  }]);
useEffect(()=>{
  refEnd.current.scrollIntoView()
},[messages])
const handleQuery = async(e)=>{
  const text = e.target.value;

  setMessages([...messages,
    {text:input,isBot:false}
  ])
  const res = await sendMsgtoAi(text)
 setMessages([...messages,
  {text,isBot:false},
  {text:res,isBot:true}

 ])
}
const toggleSidebar =()=>{
  settHamburger(!hamburger)
}
  async function handleSend(message){
    const text = input;
    setInput("")
    setMessages([...messages,
      {text:input,isBot:false}
    ])
    const res = await sendMsgtoAi(text)
   setMessages([...messages,
    {text,isBot:false},
    {text:res,isBot:true}

   ])
  
  }

  return (
    <>
    <div className="main-container ">
    <button className="hamburger" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
    <div className={`left t ${hamburger ? "open" : ""}`}>
      <div className="upper">
        <div className="upper-top">
        <Gi3dGlasses id='logo' size={40} />
    <p>TARUN AI</p>
    </div>
    <button id='new-chat' onClick={()=>window.location.reload()}> <img src={add} alt="" />New Chat</button>
    <div className="buttons">
      <div className="first-button button"><img src={message} /><button onClick={handleQuery} value={"What is Programming ?"}>What is Programming ?</button></div>
      <div className="second-button button"><img src={message} /><button onClick={handleQuery} value={"How to Use an API ?"}>How to Use an API ?</button></div>
    </div>
      </div>
      <div className="lower">
        <div className="button-lower"><img src={home} alt="" />Home</div>
        <div className="button-lower"><img src={bookmark} alt="" />Saved</div>
        <div className="button-lower"><img src={rocket} alt="" />Upgrade to Pro</div>
      </div>
    </div>
    <div className="right">
      <div className="display">
        <div id="inputs">
       
        <div className="ai-input input">
         

        </div>
        {messages.map((message,i)=>(
          <div key={i} className={message.isBot ? "ai-input input" : "user-input input"}>
          {message.isBot ? (
            <Gi3dGlasses size={40} className="icon" />
          ) : (
            <img src={user} className="img" alt="User Icon" />
          )}
          <p>{message.text}</p>
        </div>
        ))}
        <div ref={refEnd}></div>
        </div>
      </div>
      <div className="footer">
        <input type="text" placeholder='Send a Message' value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}/><button id="send" onClick={handleSend}>
  <img src={send} alt="" />
</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
