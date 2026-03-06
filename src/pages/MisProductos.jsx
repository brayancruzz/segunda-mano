import ProductList from "../components/products/product_list";
import '../components/page_css/root.css';
import '../components/ui/color.css';
import '../components/page_css/MisProductos.css';

function MisProductos() {
  return (
    <section className="main_container">
      <div className="body_container">
        <h2 className="blue_gray_900">Mis productos</h2>
        <ProductList />
      </div>
    </section>
  );
}

export default MisProductos;
