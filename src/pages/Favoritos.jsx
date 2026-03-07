import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/products/product_list";
import '../components/page_css/root.css';
import '../components/ui/color.css';
import '../components/page_css/Favoritos.css';

function Favoritos() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/login');
  }, [navigate]);

  return (
    <section className="main_container">
      <div className="body_container">
        <h2 className="blue_gray_900">Favoritos</h2>
        <p className="blue_gray_800">Aún no has marcado productos como favoritos.</p>
        {/* futuro: reemplazar por ProductList filtrado */}
        <ProductList />
      </div>
    </section>
  );
}

export default Favoritos;
