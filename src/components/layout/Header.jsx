import { Link } from 'react-router-dom';
import './Header.css';
import '../ui/btn_styles.css';
import '../ui/color.css';
import '../ui/input.css';

function Header() {
    return (
      <header className="header">
        <div className="header-container">
        <div className="logo-container">
          <Link to="/" style={{textDecoration: 'none'}}><h1 className="logo-title blue_gray_900">Segunda Mano</h1></Link>
          <p className="logo-description blue_gray_800">Compra y vende fácil</p>
        </div>
        <div className='input-search-container'>
          <input type="text" placeholder='Buscar articulo' className='input-search'/>
        </div>
  
        <nav className="navigation">
          <Link to="/"><button className="btn-primary">Iniciar sesión</button></Link>
          <Link to="/signup"><button className="btn-secondary">Registrarse</button></Link>
        </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  