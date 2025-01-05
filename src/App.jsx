import React, { useEffect, useRef, useState } from 'react'

export default function App() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpRef = useRef([]);
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
  return (
    <div>
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
    </div>
  )
}
