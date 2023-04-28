import React, { useState } from "react";
import './App.css';
import Otp from "./component/Otp";


export default function App() {
  const [otp, setOtp] = useState('');
  const value = '';
  const onChange = (value)=>{
    setOtp(value);
  };

  const handleSubmit = () => {
    let otpCollection= document.getElementsByClassName('otp-input');
    let otpArray = [];
    // console.log(Array.from(otp))

    Array.from(otpCollection).map((otp)=>{
      otpArray.push(otp.value)
    })

    fetch("https://blys-backend.onrender.com/otp/verify",{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(otpArray)
    }).then((res)=>res.json())
      .then((json)=>alert('success')
      );

  }

  return <div className="container">
    <h2>Verification Code:</h2>
    <Otp value={otp} valueLength={6} onChange={onChange}/> 
    <span>You can only paste 6 digit numbers</span><br></br>


    <button id="submit" className="submit" onClick={handleSubmit}>SUBMIT</button>
  </div>;
}