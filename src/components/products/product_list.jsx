import { useState, useEffect } from 'react';
import Card from "../layout/Card";
import '../ui/color.css';
import './product_list.css';
import { getProducts } from "../../api/products.api";

function ProductList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setList(data || []);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('No se pudieron cargar los productos');
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos de TuOfertaApp...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="products_list_container">
      {list.length > 0 ? (
        list.map(item => (
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
        ))
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </section>
  );
}

export default ProductList;