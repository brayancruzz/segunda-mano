import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "../components/products/product_list";
import '../components/page_css/root.css';
import '../components/ui/color.css';
import '../components/page_css/Profile.css';

// placeholder icons
const UserIcon = () => (
  <div className="avatar">👤</div>
);
const PublicationsIcon = () => <span className="action-icon">📦</span>;
const FavoritesIcon = () => <span className="action-icon">❤️</span>;

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [productCount, setProductCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      const all = JSON.parse(localStorage.getItem('products') || '[]');
      setProductCount(all.filter(p => p.seller?.id === u.id).length);
      // for now favorites not implemented, default 0
      setFavoritesCount(0);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null; // or a spinner
  }

  return (
    <section className="main_container">
      <div className="profile-header">
        <h2 className="white">Mi perfil</h2>
      </div>
      <div className="body_container">
        <div className="user-card">
          <UserIcon />
          <div className="user-info">
            <span className="blue_gray_900 name">{user.nombre}</span>
            <span className="blue_gray_800 status">
              {user.verified ? "Verificado" : "Pendiente"}
            </span>
          </div>
        </div>

        <div className="actions-cards">
          <div className="action-card" onClick={() => navigate("/mis-productos") }>
            <PublicationsIcon />
            <div>
              <span className="blue_gray_900">Mis publicaciones</span>
              <span className="blue_gray_800 count">{productCount}</span>
            </div>
          </div>
          <div className="action-card" onClick={() => navigate("/favoritos") }>
            <FavoritesIcon />
            <div>
              <span className="blue_gray_900">Favoritos</span>
              <span className="blue_gray_800 count">{favoritesCount}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Profile;
