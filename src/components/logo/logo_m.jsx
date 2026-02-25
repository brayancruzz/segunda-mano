import "./logo.css"
import "../ui/color.css"
import { Link } from 'react-router-dom';


function LogoM() {
    return (
        <section className='logo-container-m'>
            <Link to="/" style={{textDecoration: 'none'}}><h1 className="logo-title-m font-white">Segunda Mano</h1></Link>
            <p className="logo-description-m font-white">Compra y vende fácil</p>
        </section>
    );
  }

  export default LogoM