import React, { useState } from "react";
import './App.css';
import Otp from "./component/Otp";
import {useNavigate} from "react-router-dom";


export default function App() {
  const navigate = useNavigate();

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

    console.log( JSON.stringify({otp:otpArray}));

    fetch("https://blys-backend.onrender.com/otp/verify",{
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({otp:otpArray})
    }).then((res)=>{
      console.log(res.status);
      if (res.status >=200 && res.status < 300){
        navigate('/success');
      }else{
        alert("Error. Length mismatch or internal server error");
      }
    });

  }

  return <div className="container">
    <h2>Verification Code:</h2>
    <Otp value={otp} valueLength={6} onChange={onChange}/> 
    <span>You can only paste 6 digit numbers</span><br></br>


    <button id="submit" className="submit" onClick={handleSubmit}>SUBMIT</button>
  </div>;
}