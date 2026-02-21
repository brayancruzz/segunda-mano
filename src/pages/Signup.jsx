import { Link } from "react-router-dom";
import '../components/page_css/root.css';
import "../components/ui/color.css";
import "../components/ui/input.css";
import "../components/ui/btn_styles.css";
import "../components/page_css/signup.css"

function Signup() {
  return (
    <section className="main_container">
      <div className="body_container signup_container">
        <h2 className="blue_gray_900">Crear cuenta</h2>
        <form className="signup_form">
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
            Registrarse
          </button>
        </form>
        <p className="signup_login-link blue_gray_800">
          ¿Ya tienes cuenta? <Link to="/" className="teal_800">Iniciar sesión</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
