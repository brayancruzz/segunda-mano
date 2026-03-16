import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../components/page_css/root.css';
import '../components/ui/color.css';
import '../components/page_css/Profile.css';
import { useUser } from "../userProcess/useUser";
import { getProducts } from "../api/products.api";
import { FaSignOutAlt } from "react-icons/fa";

const UserIcon = () => (
  <div className="avatar">👤</div>
);
const PublicationsIcon = () => <span className="action-icon">📦</span>;
const FavoritesIcon = () => <span className="action-icon">❤️</span>;

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [productCount, setProductCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      loadUserStats();
    }
  }, [user, navigate]);

  const loadUserStats = async () => {
    try {
      setIsLoading(true);
      const all = await getProducts();
      const userProducts = all.filter(p => p.seller?.id === user.id);
      setProductCount(userProducts.length);
      setFavoritesCount(0); // TODO: Load from backend when favorites endpoint is available
    } catch (err) {
      console.error('Error loading user stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <section className="main_container profile_page">
      <div className="profile-header background_cyan_800">
        <h2 className="headerText blue_gray_900">Mi perfil</h2>
      </div>
      <div className="profile_container">
        <div className="user-card">
          <UserIcon />
          <div className="user-info">
            <span className="blue_gray_900 name">{user.first_name} {user.last_name}</span>
            <span className="blue_gray_800 email">{user.email}</span>
            <span className="blue_gray_800 status">
              {user.verified == true ? <span className="verified font-white background_green_500">Verificado</span> : <span className="pending font-white background_red_500">Pendiente</span>}
            </span>
          </div>
        </div>

        <div className="actions-cards">
          <div className="action-card" onClick={() => navigate("/mis-productos") }>
            <PublicationsIcon />
            <div>
              <span className="blue_gray_900">Mis publicaciones</span>
              <span className="blue_gray_800 count">{isLoading ? '-' : productCount}</span>
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

        <div className="actionButtons">
          <button onClick={handleLogoutClick} className="btn-primary">
              <FaSignOutAlt className="logout-icon" />
              Cerrar sesión
          </button>
        </div>
        
      </div>
    </section>
  );
}

export default Profile;
