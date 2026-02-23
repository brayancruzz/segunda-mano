function AuthForm({ submitLabel, variant }) {
  const isSignup = variant === "signup";

  return (
    <form className="auth_form">
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
          placeholder="Mínimo 6 caracteres"
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

      <button type="submit" className="btn-secondary signup_btn">
        {submitLabel}
      </button>
    </form>
  );
}

export default AuthForm;

