import React, { useRef } from "react";

function OTPForm({ otp, onChange }) {
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    // only keep last char
    const digit = value.slice(-1);
    const arr = otp.split("");
    arr[index] = digit;
    const newOtp = arr.join("");
    onChange(newOtp);
    // move focus
    if (digit && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-container">
      <label className="blue_gray_800">
        Ingresa el código enviado a tu correo
      </label>
      <div className="otp-inputs">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            type="text"
            className="input-search otp-digit"
            value={otp[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            maxLength={1}
            ref={(el) => (inputsRef.current[i] = el)}
          />
        ))}
      </div>
    </div>
  );
}

export default OTPForm;
