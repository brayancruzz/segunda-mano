import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../components/page_css/root.css';
import '../components/ui/color.css';
import '../components/page_css/MisProductos.css';
import Card from "../components/layout/Card";

function MisProductos() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    condition: "",
    price: "",
    image: "",
    url_contact: "",
    ubicacion: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    let u;
    try {
      u = JSON.parse(storedUser);
    } catch (e) {
      console.error('Bad user JSON', e);
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
    setUser(u);
    loadProducts(u);
  }, [navigate]);

  const loadProducts = (u) => {
    const all = JSON.parse(localStorage.getItem('products') || '[]');
    const mine = all.filter(p => p.seller?.id === u.id);
    setProducts(mine);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePublish = () => {
    // basic validation
    if (!form.title || !form.description || !form.price || !form.image || !form.url_contact || !form.ubicacion) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const all = JSON.parse(localStorage.getItem('products') || '[]');
    const nextId = all.length ? Math.max(...all.map(p=>p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      title: form.title,
      description: form.description,
      condition: form.condition,
      price: form.price,
      image: form.image,
      url_contact: form.url_contact,
      product_id: 'prd_' + Date.now(),
      seller: user,
      ubicacion: form.ubicacion,
    };
    all.push(newProduct);
    localStorage.setItem('products', JSON.stringify(all));
    setProducts(prev => [...prev, newProduct]);
    // clear form
    setForm({ title: "", description: "", condition: "", price: "", image: "", url_contact: "", ubicacion: "" });
  };

  const handleDelete = (id) => {
    let all = JSON.parse(localStorage.getItem('products') || '[]');
    all = all.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(all));
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section className="main_container">
      <div className="body_container">
        <h2 className="blue_gray_900">Mis productos</h2>

        <div className="product-form">
          <label>Título</label>
          <input name="title" value={form.title} onChange={handleChange} className="input-search" />
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="input-search" />
          <label>Estado</label>
          <input name="condition" value={form.condition} onChange={handleChange} className="input-search" />
          <label>Precio</label>
          <input name="price" value={form.price} onChange={handleChange} className="input-search" />
          <label>Imagen (URL)</label>
          <input name="image" value={form.image} onChange={handleChange} className="input-search" />
          <label>URL de contacto</label>
          <input name="url_contact" value={form.url_contact} onChange={handleChange} className="input-search" />
          <label>Ubicación</label>
          <input name="ubicacion" value={form.ubicacion} onChange={handleChange} className="input-search" />
          <button className="btn-primary" onClick={handlePublish}>Publicar producto</button>
        </div>

        <div className="user-products">
          {products.map(p => (
            <div key={p.id} className="product-item">
              <Card
                title={p.title}
                description={p.description}
                image={p.image}
                price={p.price}
              />
              <button className="btn-secondary delete-button" onClick={() => handleDelete(p.id)}>
                Eliminar producto
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MisProductos;
