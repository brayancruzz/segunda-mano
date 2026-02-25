import "./signup_login_banner.css"
import "../ui/color.css"
import LogoM from "../logo/logo_m";

function InfoAccessBanner() {
    return (
        <section className='signup_login_banner background_cyan_800'>
            <div className="bubbles">
                <div className="bubble_m left-top background_cyan_500"></div>
                <div className="bubble_m right-top background_cyan_700">
                    <div className="bubble_s left-bottom background_cyan_600"></div>
                </div>
                <div className="bubble_l left-bottom background_cyan_900">
                    <div className="bubble_m right-top background_cyan_700"></div>
                </div>
                <div className="bubble_s right-bottom background_cyan_700"></div>
            </div>
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
  