import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';
import '../ui/btn_styles.css';
import '../ui/color.css';
import '../ui/input.css';
import LogoS from '../logo/logo_s';

function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const location = useLocation();
    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
                localStorage.removeItem('user');
                setUser(null);
            }
        } else setUser(null);
    }, [location]);

    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     setUser(null);
    //     navigate('/');
    // };

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
  