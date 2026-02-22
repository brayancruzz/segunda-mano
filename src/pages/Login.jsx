import { Link } from "react-router-dom";
import '../components/page_css/root.css';
import "../components/ui/color.css";
import "../components/ui/input.css";
import "../components/ui/btn_styles.css";
import "../components/page_css/login.css"
import "../components/page_css/share_css/signup_login.css"
import InfoAccessBanner from "../components/layout/share_css/signup_login_banner";

function Login() {
  return (
    <section className="main_container">
      <div className="signup_login_container">
        <InfoAccessBanner/>
        <div className="login_container">
          <h2 className="blue_gray_900">Iniciar sesión</h2>
          <form className="login_form">
            <div className="form_field">
              <label htmlFor="nombre" className="blue_gray_800">Nombre completo</label>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                className="input-search"
                required
              />
            </div>
            <div className="form_field">
              <label htmlFor="email" className="blue_gray_800">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                className="input-search"
                required
              />
            </div>
            <div className="form_field">
              <label htmlFor="password" className="blue_gray_800">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="input-search"
                required
              />
            </div>
            <div className="form_field">
              <label htmlFor="confirmar" className="blue_gray_800">Confirmar contraseña</label>
              <input
                id="confirmar"
                type="password"
                placeholder="Repite tu contraseña"
                className="input-search"
                required
              />
            </div>
            <button type="submit" className="btn-secondary signup_btn">
              Iniciar sesión
            </button>
          </form>
          <p className="signup_login-link blue_gray_800">
            ¿Aún no tienes una cuenta? <Link to="/signup" className="teal_800">Registrarme</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
