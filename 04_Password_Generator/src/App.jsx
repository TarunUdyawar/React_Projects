import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  let [length,setLength] = useState(8)
  let [number,setNumber] = useState(false)
  let [char,setChar] = useState(false)
  let [password,setPassword] = useState("")

  let passwordRef = useRef(null)

const generatePassword= ()=>{
  let str ="ABCDEFGHIJKLMNOPQRSTQUVWXYZabcxefghijklmnopqrstquvwxyz"
  let pass =''
  if(number) str += "1234567890"
  if(char) str += "!@#$%^&*()_-+={}|[]:,./<>?</>"
  for(let i=0;i<length;i++){
    let char = Math.floor(Math.random()*str.length)
    pass += str.charAt(char)
  }
  return pass
}
const copyToClipboard=()=>{
  passwordRef.current?.select(password)
  window.navigator.clipboard.writeText(password)
}
useEffect(()=>{
  setPassword(generatePassword())
},[length,number,char])
  return (
    <>
      <>
  <h1 className="font-extrabold text-center text-3xl mt-8">
    Password Generator
  </h1>
  <div className="input flex w-screen mt-8 items-center justify-center gap-3.5">
    <input
      type="text"
      readOnly
      className="bg-gray-400 p-3 rounded-3xl w-96"
      value={password}
      ref={passwordRef}
    />
    <button className="bg-gray-600 p-3 rounded-3xl" onClick={copyToClipboard} >Copy</button>
  </div>
  <div className="mod flex w-screen mt-8 items-center justify-center gap-3.5">
    <input type="range" min={8} max={100}  className="cursor-pointer" onChange={(e)=>{
      setLength(Number(e.target.value))
    }} />
    <label className="font-extrabold text-center text-xl" > Length = {length}</label>
    <label className="font-extrabold text-center text-xl" > Numbers </label>
    <input type="checkbox" checked={number} onClick={()=> setNumber((prev)=>!prev) }/>
    <label className="font-extrabold text-center text-xl" > Characters </label>
    <input type="checkbox"  checked={char} onClick={()=>setChar((prev)=>!prev)} />
  </div>
</>

    </>
  );
}

export default App;
