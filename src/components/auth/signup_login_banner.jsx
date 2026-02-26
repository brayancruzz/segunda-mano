import "./signup_login_banner.css"
import "../ui/color.css"
import LogoM from "../logo/logo_m";
import BackgroundBubble from "../ui/background/backgroundBubbles";

function InfoAccessBanner() {
    return (
        <section className='signup_login_banner'>
            <BackgroundBubble/>
            <div className="title_descrition_page">
                <LogoM/>
                <div className="tit-des-container">
                    <h2 className="title_auth_banner">DALE UNA SEGUNDA VIDA A LO QUE YA NO USAS</h2>
                    <p className="description-auth-banner">Conecta con personas cerca de ti y convierte cosas olvidadas en nuevas oportunidades.</p>
                </div>
                <div className="empty-group"></div>
            </div>
        </section>
    );
  }
  
  export default InfoAccessBanner;
  