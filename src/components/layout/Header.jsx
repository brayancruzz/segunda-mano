import { Link } from 'react-router-dom';
import './Header.css';
import '../ui/btn_styles.css';
import '../ui/color.css';
import '../ui/input.css';
import LogoS from '../logo/logo_s';

function Header() {
    return (
      <header className="header">
        <div className="header-container">
          <LogoS/>
        <div className='input-search-container'>
          <input type="text" placeholder='Buscar articulo' className='input-search'/>
        </div>
  
        <nav className="navigation">
          <Link to="/profile"><button className="btn-secondary">Mi perfil</button></Link>
          <Link to="/login"><button className="btn-primary">Iniciar sesión</button></Link>
          <Link to="/signup"><button className="btn-secondary">Registrarse</button></Link>
        </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  