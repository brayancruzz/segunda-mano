import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundBubble from "../components/ui/background/backgroundBubbles";
import "../components/auth/signup_login_banner.css";
import "../components/page_css/onbording.css";
import "../components/ui/color.css";
import StepHeader from "../components/onboarding/StepHeader";
import IDUpload from "../components/onboarding/IDUpload";
import OTPForm from "../components/onboarding/OTPForm";
import Confirmation from "../components/onboarding/Confirmation";
import { error, success } from "../components/layout/Toast";

function Onbording() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [otp, setOtp] = useState("");

  const titles = [
    "",
    "Validación de identidad",
    "Verificación de código",
    "Confirmación"
  ];
  const descriptions = [
    "",
    "Para continuar necesitamos validar tu identidad. Sube una foto de la parte frontal y trasera de tu cédula.",
    "Ingresa el código enviado a tu correo",
    ""
  ];

  const goNext = () => {
    if (step === 1) {
      if (!frontFile || !backFile) {
        error("Debes subir ambas imágenes");
        return;
      }
    }
    if (step === 2) {
      if (otp.trim().length !== 4) {
        error("Ingresa los 4 dígitos del código");
        return;
      }
      success("Código verificado");
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const goBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <section className='backgroundOnbording'>
      <BackgroundBubble />
      <div className='onbordingFormContainer blue_gray_900'>
        <div className="content">
          <StepHeader step={step} total={totalSteps} onBack={goBack} />

          {/* heading / description that changes per step */}
          <h2 className="blue_gray_900" style={{ marginTop: 24 }}>{titles[step]}</h2>
          {descriptions[step] && (
            <p
              className="blue_gray_800"
              style={{ marginTop: 8, fontSize: step === 2 ? "14px" : undefined }}
            >
              {descriptions[step]}
            </p>
          )}

          {/* content by step */}
          {step === 1 && (
            <IDUpload
              frontFile={frontFile}
              onFrontChange={setFrontFile}
              backFile={backFile}
              onBackChange={setBackFile}
            />
          )}
          {step === 2 && <OTPForm otp={otp} onChange={setOtp} />}
          {step === 3 && <Confirmation />}
        </div>

        <div className="button-row" style={{ marginTop: 32, alignSelf: "flex-end" }}>
          {step < totalSteps && (
            <button className="btn-secondary signup_login_btn" onClick={goNext}>
              Continuar
            </button>
          )}
          {step === totalSteps && (
            <button className="btn-secondary signup_login_btn" onClick={() => navigate('/')}>Ir al inicio</button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Onbording;
