import React from "react";

function OTPForm({ otp, onChange }) {
  return (
    <div className="otp-container">
      <label htmlFor="otp" className="blue_gray_800">
        Ingresa el código enviado a tu correo
      </label>
      <input
        id="otp"
        type="text"
        className="input-search"
        value={otp}
        onChange={(e) => onChange(e.target.value)}
        maxLength={6}
        placeholder="Código OTP"
      />
    </div>
  );
}

export default OTPForm;
