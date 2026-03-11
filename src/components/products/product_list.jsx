import { useState, useEffect } from 'react';
import Card from "../layout/Card";
import '../ui/color.css';
import './product_list.css';
import { products as fetchProducts } from "../../data/products"; 

function ProductList({ products }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      
      const datosReales = await fetchProducts(); 
      
      setApiProducts(datosReales);
      setLoading(false);
    };

    if (!products) {
      cargarDatos();
    } else {
      setLoading(false);
    }
  }, [products]);

  let list = [];
  
  if (products) {
    list = products;
  } else {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem('products') || '[]');
    } catch (e) {
      console.error('Invalid products in localStorage', e);
      localStorage.removeItem('products');
      stored = [];
    }
    list = [...stored, ...apiProducts];
  }

  if (loading) {
    return <p>Cargando productos de TuOfertaApp...</p>;
  }

  return (
    <section className="products_list_container">
        {list.map(item => (
            <Card
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                price={item.price}
                url_contact={item.url_contact}
                location={item.location}
                seller={item.seller}
            />
        ))}
    </section>
  );
}

export default ProductList;