import Card from "../layout/Card";
import '../ui/color.css';
import './product_list.css';
import { products } from "../../data/products";

function ProductList() {
  return (
    <section className="products_list_container">
        {products.map(item => (
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