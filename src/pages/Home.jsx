import ProductList from "../components/products/product_list";
import '../components/page_css/root.css';
import '../components/ui/color.css';

function Home() {
  return (
    <section className="main_container">
      <div className="body_container">
        <h2 className="blue_gray_900">Productos destacados</h2>
        <ProductList/>
      </div>
    </section>
  );
}

export default Home;