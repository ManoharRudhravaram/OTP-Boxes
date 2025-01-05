import React, { useEffect, useRef, useState } from 'react'
import Lottie from "lottie-react";
import cart from "./assets/anime.json";

export default function App() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpvalue = 1234;
  const otpRef = useRef([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    otpRef.current[0]?.focus();
  }, [])

  const otpHandler = (e, i) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[i] = value.slice(-1);
      setOtp(newOtp);
      if (value && i < otp.length - 1) {
        otpRef.current[i + 1].focus();
      }
    }
  }

  const downHandler = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRef.current[index - 1]?.focus();
    }
  }

  const submitHandler = () => {
    setLoader(true);
    if (otpvalue === +otp.join('')) {
      setTimeout(() => {
        setShow(true);
        setLoader(false);
      }, 1000);
    }
    else{
      setLoader(false);
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      {
        !show ? (
          <>
            <h4>OTP</h4>
            <div className="otp">
              {
                otp.map((_, i) => (
                  <input type="text" style={{ width: "30px", height: "25px", marginLeft: "10px", textAlign: "center" }} ref={(ele) => otpRef.current[i] = ele} onChange={(e) => otpHandler(e, i)} value={otp[i]}
                    onKeyDown={(e) => downHandler(e, i)}
                  />
                ))
              }
            </div>
            <button disabled={otp.some(val => val === "")} onClick={submitHandler}>submit</button>
            {
              loader && <p>Validating...</p>
            }
          </>
        ) : (
          <Lottie animationData={cart} />
        )
      }
    </div >
  )
}
