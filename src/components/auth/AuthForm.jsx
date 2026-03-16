import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { error, success } from "../layout/Toast";
import { loginUser, registerUser } from "../../api/auth.api";
import { useAuth } from "../../userProcess/useAuth";

function AuthForm({ submitLabel, variant }) {
  const isSignup = variant === "signup";
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.target;
      const email = form.email.value.trim();
      const password = form.password.value;

      if (
        !email ||
        !password ||
        (isSignup && (!form.nombre.value.trim() || !form.confirmar.value || !form.phone.value.trim()))
      ) {
        error("Todos los campos son obligatorios");
        setIsLoading(false);
        return;
      }

      if (isSignup) {
        const nombre = form.nombre.value.trim();
        const confirmar = form.confirmar.value;
        const phone = form.phone.value.trim();

        if (password.length < 8) {
          error("La contraseña debe tener al menos 8 caracteres");
          setIsLoading(false);
          return;
        }

        if (password !== confirmar) {
          error("Las contraseñas no coinciden");
          setIsLoading(false);
          return;
        }

        // Call backend registration endpoint
        const result = await registerUser({
          nombre,
          email,
          phone,
          password,
        });

        // Store token and set user context
        login(result.token, result.user);
        success("Registro exitoso");
        navigate("/onbording");
      } else {
        // Call backend login endpoint
        console.log('Attempting login with email:', email);
        const result = await loginUser(email, password);

        // Store token and set user context
        login(result.token, result.user);
        success("Bienvenido, " + result.user?.first_name || "usuario");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Authentication error:", err.message);
      const errorMsg = err.message || "Error en la autenticación";
      error(errorMsg);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          />
        </div>
      )}
      {isSignup && (
        <div className="form_field">
          <label htmlFor="phone" className="blue_gray_800">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+573XXXXXXXXX"
            className="input-search"
            required
            disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
      )}

      <button type="submit" className="btn-secondary signup_login_btn" disabled={isLoading}>
        {isLoading ? "Procesando..." : submitLabel}
      </button>
    </form>
  );
}

export default AuthForm;