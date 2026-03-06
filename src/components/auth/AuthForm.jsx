import { useNavigate } from "react-router-dom";
import { error, success, warning, info } from "../layout/Toast";

function AuthForm({ submitLabel, variant }) {
  const isSignup = variant === "signup";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password || (isSignup && (!form.nombre.value.trim() || !form.confirmar.value))) {
      error("Todos los campos son obligatorios");
      return;
    }

    if (isSignup) {
      const nombre = form.nombre.value.trim();
      const confirmar = form.confirmar.value;

      if (password.length < 8) {
        error("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      if (password !== confirmar) {
        error("Las contraseñas no coinciden");
        return;
      }
    }

    navigate("/onbording");
  };

  return (
    <form className="auth_form" onSubmit={handleSubmit}>
      {isSignup && (
        <div className="form_field">
          <label htmlFor="nombre" className="blue_gray_800">
            Nombre completo
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            className="input-search"
            required
          />
        </div>
      )}

      <div className="form_field">
        <label htmlFor="email" className="blue_gray_800">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          className="input-search"
          required
        />
      </div>

      <div className="form_field">
        <label htmlFor="password" className="blue_gray_800">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          className="input-search"
          required
        />
      </div>

      {isSignup && (
        <div className="form_field">
          <label htmlFor="confirmar" className="blue_gray_800">
            Confirmar contraseña
          </label>
          <input
            id="confirmar"
            type="password"
            placeholder="Repite tu contraseña"
            className="input-search"
            required
          />
        </div>
      )}

      <button type="submit" className="btn-secondary signup_login_btn">
        {submitLabel}
      </button>
    </form>
  );
}

export default AuthForm;