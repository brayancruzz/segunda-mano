import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundBubble from "../components/ui/background/backgroundBubbles";
import "../components/auth/signup_login_banner.css"
import "../components/page_css/onbording.css"
import "../components/ui/color.css"

function Onbording() {
  const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); 
      console.log("Archivo seleccionado:", file);
    }
  };
  return (
    <section className='backgroundOnbording'>
        <BackgroundBubble/>
        <div className='onbordingFormContainer blue_gray_900'>
          <header className='step-header'>
              <div className="step_top_row">
                  <span className="step_text">Paso 2 de 3</span>
                  <Link to="#" className="back_button">← Volver</Link> 
              </div>
              <div className="progress_bar_bg">
              <div className="progress_bar_fill" style={{ width: 40 }}></div></div>
          </header>
          
        </div>
    </section>
  );
}

export default Onbording;
