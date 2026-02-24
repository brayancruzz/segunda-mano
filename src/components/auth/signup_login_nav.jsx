import "./signup_login_nav.css";
import { NavLink } from "react-router-dom";

function NavSignupLogin() {
  return (
    <section className="navAccessOptionsWrapper">
      <ul className="navAccessOptions">
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `navAccessOption ${isActive ? "navAccessOption--active" : ""}`
            }
          >
            Iniciar sesión
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `navAccessOption ${isActive ? "navAccessOption--active" : ""}`
            }
          >
            Registrarme
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default NavSignupLogin;