import Card from "../layout/Card";
import '../ui/color.css';
import './product_list.css';
import { products as defaultProducts } from "../../data/products";

function ProductList({ products, onDelete }) {
  // if explicit products passed use them, otherwise merge stored + default
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
    // merge but don't mutate
    list = [...stored, ...defaultProducts];
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
            />
        ))}
    </section>
  );
}

export default ProductList;