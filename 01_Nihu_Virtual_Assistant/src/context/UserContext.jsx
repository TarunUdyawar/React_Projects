import React, { createContext,  useState } from 'react'
import run from '../gemini';
export const dataContext = createContext()
function UserContext({children}) {
  let [speaking,setSpeaking] = useState(false)
  let[rgtext,setRgText] = useState("listening...")
  let[response,setResponse] = useState(false)
  function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
  }
  async function aiResponse(prompt){
    let text =await run(prompt);
    let newText = text.split("**") && text.split("*") && text.replace("google","Tarun Udyawar")&& text.replace("Google","Tarun Udyawar")
    setRgText(newText)
    speak(text)
setResponse(true)
setTimeout(()=>{

  setSpeaking(false)
},5000)
  }
  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult=(e)=>{
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript
    setRgText(transcript)
    command(transcript.toLowerCase())
  }
  function command(command){
    if(command.includes("open") && command.includes("youtube")){
      window.open('https://www.youtube.com','_blank')
      speak("Opening Youtube");
      setSpeaking("Opening Youtube....");
      setTimeout(()=>{

        setSpeaking(false)
      },5000)
    }
   else if(command.includes("open") && command.includes("instagram")){
      window.open('https://www.instagram.com','_blank')
      speak("Opening Instagram");
      setSpeaking("Opening Instagram....");
      setTimeout(()=>{

        setSpeaking(false)
      },5000)
    }
else{
  aiResponse(command)
}
  }
  let value ={
    recognition,
    speaking,
setSpeaking,
rgtext,
setRgText,
response,
setResponse
  }
  return (
    <div>
      <dataContext.Provider value={value}>
              {children}
      </dataContext.Provider>
</div>
  )
}

export default UserContext