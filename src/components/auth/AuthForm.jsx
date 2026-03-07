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

    // require phone on signup
    if (
      !email ||
      !password ||
      (isSignup && (!form.nombre.value.trim() || !form.confirmar.value || !form.phone.value.trim()))
    ) {
      error("Todos los campos son obligatorios");
      return;
    }

    if (isSignup) {
      const nombre = form.nombre.value.trim();
      const confirmar = form.confirmar.value;
      const phone = form.phone.value.trim();

      if (password.length < 8) {
        error("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      if (password !== confirmar) {
        error("Las contraseñas no coinciden");
        return;
      }

      // registration logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find((u) => u.email === email)) {
        error("Ya existe un usuario con ese correo");
        return;
      }
      const id = "usr_" + Date.now();
      const newUser = { id, nombre, email, phone, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      // set current user (without password)
      const cur = { id, nombre, email, phone };
      localStorage.setItem("user", JSON.stringify(cur));
      success("Registro exitoso");
      navigate("/profile");
      return;
    } else {
      // login logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) {
        error("Credenciales inválidas");
        return;
      }
      const cur = { id: found.id, nombre: found.nombre, email: found.email, phone: found.phone };
      localStorage.setItem("user", JSON.stringify(cur));
      success("Bienvenido, " + found.nombre);
      navigate("/profile");
      return;
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