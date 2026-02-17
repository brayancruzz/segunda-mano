import './Header.css';
import '../ui/btn_styles.css';
import '../ui/color.css';
import '../ui/input.css';

function Header() {
    return (
      <header className="header">
        <div className="header-container">
        <div className="logo-container">
          <h1 className="logo-title blue_gray_900">Segunda Mano</h1>
          <p className="logo-description blue_gray_800">Compra y vende fácil</p>
        </div>
        <div className='input-search-container'>
          <input type="text" placeholder='Buscar articulo' className='input-search'/>
        </div>
  
        <nav className="navigation">
          <button className="btn-primary">Iniciar sesión</button>
          <button className="btn-secondary">Registrarse</button>
        </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
  