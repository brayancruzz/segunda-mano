import "./logo.css"
import "../ui/color.css"
import { Link } from 'react-router-dom';

function LogoS() {
    return (
        <section className='logo-container-s'>
            <Link to="/" style={{textDecoration: 'none'}}><h1 className="logo-title-s blue_gray_900">Segunda Mano</h1></Link>
            <p className="logo-description-s blue_gray_800">Compra y vende fácil</p>
        </section>
    );
  }

  export default LogoS
  