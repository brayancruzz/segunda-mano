import "../share_css/signup_login_nav.css"
import { Link } from "react-router-dom";

function NavSignupLogin () {
    return (
        <section>
            <ul className="navAccessOptions">
                <li className="navAccessOption" to="/login">
                    Iniciar sesión
                </li>
                <li className="navAccessOption" to="/signup">
                    Registrarme
                </li>
            </ul>
        </section>
    )
}

export default NavSignupLogin