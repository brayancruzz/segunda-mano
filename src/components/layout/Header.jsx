import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import '../ui/btn_styles.css';
import '../ui/color.css';
import '../ui/input.css';
import LogoS from '../logo/logo_s';
import { useUser } from '../../userProcess/useUser';

function Header() {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
      <header className="header">
        <div className="header-container">
          <LogoS/>
          <div className='input-search-container'>
            <input type="text" placeholder='Buscar articulo' className='input-search'/>
          </div>

          <nav className="navigation">
            {user ? (
              <>
                <Link to="/profile"><button className="btn-secondary">Mi perfil</button></Link>
              </>
            ) : (
              <>
                <Link to="/login"><button className="btn-secondary">Iniciar sesión</button></Link>
                <Link to="/signup"><button className="btn-primary">Registrarse</button></Link>
              </>
            )}
          </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  